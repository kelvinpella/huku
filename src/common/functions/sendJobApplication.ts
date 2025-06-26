import {
  ApplicationStatus,
  ContactDetailsForm,
  DownloadableImage,
  Job,
  LocalFile,
  LocalOrDownloadableFile,
} from "@/typings";
import { sendJobApplicationAction } from "../actions/sendJobApplicationAction";
import { Dispatch, SetStateAction, startTransition } from "react";
import { revalidateSwrPartialKeys } from "./revalidateSwrPartialKeys";
import { updateUserContactDetailsAction } from "../actions/updateUserContactDetailsAction";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { User } from "@supabase/supabase-js";

const separateNewAndExistingImages = (
  images: LocalOrDownloadableFile[]
): [LocalFile[], DownloadableImage[]] => {
  const imagesToUpload = [];
  const imagesToKeep = [];
  for (const image of images) {
    if (image instanceof File) {
      imagesToUpload.push(image);
    } else {
      imagesToKeep.push(image);
    }
  }
  return [imagesToUpload, imagesToKeep];
};

export async function sendJobApplication(
  contactDetails: ContactDetailsForm,
  jobId: Job["id"],
  setApplicationStatus: Dispatch<SetStateAction<ApplicationStatus | null>>,
  userId: User["id"]
) {
  const supabase = createClient();

  const [imagesToUpload, imagesToKeep] = separateNewAndExistingImages(
    contactDetails.images
  );

  // upload images to storage
  const results = await Promise.all(
    imagesToUpload.map((image) => {
      const fileName = image.name;
      const fileExtension = fileName.split(".").pop();
      const uniqueIdentifier = uuidv4();
      // userId is used as folder name
      const path = `${userId}/${uniqueIdentifier}.${fileExtension}`;

      return supabase.storage.from("user-images").upload(path, image);
    })
  );

  const imagesToUpdateUserMetadata: DownloadableImage[] = [
    ...results.map(({ data }) => {
      const downloadUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.fullPath}`;
      const storageId = data?.id ?? "";
      const storagePath = data?.path ?? "";

      return { downloadUrl, storageId, storagePath };
    }),
    ...imagesToKeep,
  ];

  // update user contact details
  await updateUserContactDetailsAction({
    ...contactDetails,
    images: imagesToUpdateUserMetadata,
  });
  revalidateSwrPartialKeys(["user"]);

  // send application
  const { data, error } = await sendJobApplicationAction(jobId);
  if (error) throw new Error(error.message);

  if (data) {
    startTransition(() => setApplicationStatus("applied"));
    revalidateSwrPartialKeys(["/api/getJobs"]);
  }
}
