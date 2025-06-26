import { ContactDetailsForm } from "@/typings";
import Image, { StaticImageData } from "next/image";
import { useFormContext } from "react-hook-form";
import wrongImageIcon from "@/../public/images/wrong_image.png";
import CustomButton from "@/components/Buttons/CustomButton";
import { MdOutlineClose } from "react-icons/md";
import { deleteImagesFromServerAction } from "@/common/actions/deleteImagesFromServerAction";
import { revalidateSwrPartialKeys } from "@/common/functions/revalidateSwrPartialKeys";

export default function ImagePreview() {
  const { getValues, setValue, trigger } = useFormContext<ContactDetailsForm>();

  const deleteImageHandler = async (
    file: ContactDetailsForm["images"][number]
  ) => {
    const files = getValues("images") || [];

    const toBeDeletedFromSupabase = [];

    // DownloadableImages need to be deleted from supabase as well
    if (!(file instanceof File)) {
      toBeDeletedFromSupabase.push(file);
    }

    // first, handle deletion from the preview images
    const filteredFiles = files.filter((dynamicFile) => {
      // If deleting a File, match by name
      if (file instanceof File && dynamicFile instanceof File) {
        return dynamicFile.name !== file.name;
      }
      // If deleting a DownloadableImage, match by storageId
      if (!(file instanceof File) && !(dynamicFile instanceof File)) {
        return dynamicFile.storageId !== file.storageId;
      }
      // Keep all others (different types)
      return true;
    });

    setValue("images", filteredFiles);
    await trigger("images");

    // delete from server
    await deleteImagesFromServerAction(toBeDeletedFromSupabase);

    await revalidateSwrPartialKeys(["user"]);
  };

  const images = getValues("images").map((file) => {
    let isImage = true;
    let src: string | StaticImageData;
    let altText: string;
    let key;

    if (file instanceof File) {
      isImage = file.type.startsWith("image/");
      src = isImage ? URL.createObjectURL(file) : wrongImageIcon;
      key = file.name;
      altText = file.name;
    } else {
      src = file.downloadUrl;
      key = file.storageId;
      altText = `${file.storageId} image`;
    }

    return (
      <div
        key={key}
        className="shrink-0 size-20 relative rounded-md border p-2"
      >
        <Image
          src={src}
          alt={altText}
          fill
          sizes="100px"
          className="size-full object-contain"
        />
        <CustomButton
          variant="plane"
          onClick={() => deleteImageHandler(file)}
          className="absolute right-0 top-0 !text-gray-500 !bg-gray-500/40 !rounded !p-0.5"
        >
          <MdOutlineClose />
        </CustomButton>
      </div>
    );
  });
  return (
    <div className="w-full flex items-center gap-2 flex-nowrap overflow-x-auto p-2">
      {images}
    </div>
  );
}
