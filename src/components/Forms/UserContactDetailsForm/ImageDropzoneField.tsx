import FieldErrorContainer from "@/components/CustomContainers/FieldErrorContainer";
import {
  ContactDetailsForm,
  DownloadableImage,
  LocalFile,
  LocalOrDownloadableFile,
} from "@/typings";
import clsx from "clsx";
import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import ImagePreview from "./ImagePreview";

export default function ImageDropzoneField() {
  const {
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<ContactDetailsForm>();

  const isDownloadableImage = (
    file: LocalOrDownloadableFile
  ): file is DownloadableImage => {
    return "downloadUrl" in file;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // add them to images list ( accepted and rejected )
      const badFiles = rejectedFiles.map(({ file }) => file);
      const currentImages = getValues("images") || [];
      const allImages = [...badFiles, ...currentImages, ...acceptedFiles];
      // make the images unique
      const updatedImages = allImages.filter((file, index, self) => {
        // return true if file has downloadUrl
        if (isDownloadableImage(file)) return true;

        return (
          index === (self as LocalFile[]).findIndex((f) => f.name === file.name)
        );
      });
      setValue("images", updatedImages);
      trigger("images"); // validate as they are added
    },
    [getValues, setValue, trigger]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        {...getRootProps()}
        className={clsx(
          "w-full border cursor-pointer rounded-md bg-gray-200 flex items-center justify-center h-20 p-4",
          isDragActive && "border-spanish-violet"
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm">Drop your photos here...</p>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-sm">Click or drag here to select photos to upload.</p>
            <span>
              <BiImageAdd size={30} className="text-gray-500 hover:scale-110" />
            </span>
          </div>
        )}
      </div>
      <ImagePreview />
      <FieldErrorContainer errorMessage={errors["images"]?.message} />
    </div>
  );
}
