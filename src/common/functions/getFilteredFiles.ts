import { ContactDetailsForm, LocalOrDownloadableFile } from "@/typings";

export function getFilteredFiles(
  files: ContactDetailsForm["images"],
  fileToRemove: LocalOrDownloadableFile
) {
  return files.filter((dynamicFile) => {
    // If deleting a File, match by name
    if (fileToRemove instanceof File && dynamicFile instanceof File) {
      return dynamicFile.name !== fileToRemove.name;
    }
    // If deleting a DownloadableImage, match by storageId
    if (!(fileToRemove instanceof File) && !(dynamicFile instanceof File)) {
      return dynamicFile.storageId !== fileToRemove.storageId;
    }
    // Keep all others (different types)
    return true;
  });
}
