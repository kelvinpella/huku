import { ContactDetailsForm, LocalOrDownloadableFile } from "@/typings";
import Image, { StaticImageData } from "next/image";
import { useFormContext } from "react-hook-form";
import wrongImageIcon from "@/../public/images/wrong_image.png";
import CustomButton from "@/components/Buttons/CustomButton";
import { MdOutlineClose } from "react-icons/md";
import { useContext, useTransition } from "react";
import { JobPostContext } from "@/common/context/JobPostContext";
import { getFilteredFiles } from "@/common/functions/getFilteredFiles";

export default function ImagePreview() {
  const { setImagesToDeleteFromSupabase } = useContext(JobPostContext);
  const { getValues, setValue ,trigger} = useFormContext<ContactDetailsForm>();
  const [, startTransition] = useTransition();

  const files = getValues("images") || [];

  const deleteImageHandler = async (file: LocalOrDownloadableFile) => {
    startTransition(() => { 
      // Downloaded images need to be deleted from supabase later
      if (!(file instanceof File)) {
        setImagesToDeleteFromSupabase((prev) => [...prev, file]);
      }
      //  handle deletion from the preview images
      const filteredFiles = getFilteredFiles(files, file);

      setValue("images", filteredFiles);
      trigger('images')
    });
  };

  const images = files.map((file) => {
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
          variant="outline"
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
