import {
  ContactDetailsForm,
  DownloadableImage,
  LocalFile,
  LocalOrDownloadableFile,
} from "@/typings";
import { uploadImagesToSupabase } from "./uploadImagesToSupabase";
import { createClient } from "@/utils/supabase/client";

const separateLocalAndDownloadedImages = (
  images: LocalOrDownloadableFile[]
): [LocalFile[], DownloadableImage[]] => {
  const imagesToUpload = [];
  const downloadedImages = [];
  for (const image of images) {
    if (image instanceof File) {
      imagesToUpload.push(image);
    } else {
      downloadedImages.push(image);
    }
  }
  return [imagesToUpload, downloadedImages];
};

export const updateUserContactDetails = async (
  contactDetails: ContactDetailsForm,
  imagesToDeleteFromSupabase: DownloadableImage[]
) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const [imagesToUpload, downloadedImages] = separateLocalAndDownloadedImages(
    contactDetails.images
  );

  const userId = user.id;

  // ADD NEW IMAGES TO SUPABASE STORAGE
  const results = await uploadImagesToSupabase(
    supabase,
    imagesToUpload,
    userId
  );

  // create an updated list of images to store
  const updatedImagesToStore: DownloadableImage[] = [
    ...results.map(({ data }) => {
      const downloadUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.fullPath}`;
      const storageId = data?.id ?? "";
      const storagePath = data?.path ?? "";

      return { downloadUrl, storageId, storagePath };
    }),
    ...downloadedImages,
  ];

  //  UPDATE OBJECT WITH NEW IMAGES URLS AND SOCIAL MEDIA
  const updatedContactDetails: ContactDetailsForm = {
    ...contactDetails,
    images: [...updatedImagesToStore],
  };

  //  SEND UPDATED CONTACT DETAILS TO SUPABASE
  await supabase.auth.updateUser({
    data: {
      contact_details: updatedContactDetails,
    },
  });

  // DELETE IMAGES FROM STORAGE
  return await supabase.storage
    .from("user-images")
    .remove(imagesToDeleteFromSupabase.map((image) => image.storagePath));
};
