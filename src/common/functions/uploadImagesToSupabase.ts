import { LocalFile } from "@/typings";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

export async function uploadImagesToSupabase(
  supabase: SupabaseClient,
  imagesToUpload: LocalFile[],
  userId: User["id"]
) {
  // upload images to storage
  return await Promise.all(
    imagesToUpload.map((image) => {
      const fileName = image.name;
      const fileExtension = fileName.split(".").pop();
      const uniqueIdentifier = uuidv4();
      // userId is used as folder name
      const path = `${userId}/${uniqueIdentifier}.${fileExtension}`;

      return supabase.storage.from("user-images").upload(path, image);
    })
  );
}
