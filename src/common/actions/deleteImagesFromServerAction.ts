"use server";

import { ContactDetailsForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";

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
