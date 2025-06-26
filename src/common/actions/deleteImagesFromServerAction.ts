"use server";

import { ContactDetailsForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";

/**
 * Deletes the specified images from the Supabase storage and updates the user's metadata
 * to remove references to those images in their contact details.
 *
 * @param images - An array of downloadable images to be deleted from the server.
 * @returns A promise that resolves to the result of the Supabase storage removal operation,
 *          or undefined if no images were provided or the user is not authenticated.
 *
 * @remarks
 * - This function first checks if there are images to delete.
 * - It retrieves the current authenticated user and their contact details from user metadata.
 * - The images are filtered to ensure uniqueness by `storageId` before updating the user's metadata.
 * - The images are then removed from the "user-images" storage bucket in Supabase.
 * - If the user is not authenticated or no images are provided, the function returns early.
 */


type DownloadableImage = Exclude<ContactDetailsForm["images"][number], File>;
export const deleteImagesFromServerAction = async (
  images: DownloadableImage[]
) => {
  if (!images.length) return;

  const supabase = await createClient();

  // delete from user meta_data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // TODO remove images from contact details
    const contactDetails = user.user_metadata.contact_details as Omit<
      ContactDetailsForm,
      "images"
    > & { images: DownloadableImage[] };

    contactDetails.images = [...contactDetails.images, ...images].filter(
      (image, index, self) => {
        return index === self.findIndex((i) => i.storageId === image.storageId);
      }
    );

    await supabase.auth.updateUser({
      data: { contact_details: { ...contactDetails } },
    });

    // delete images from storage
    return await supabase.storage
      .from("user-images")
      .remove(images.map((image) => image.storagePath));
  }
};
