import FieldErrorContainer from "@/components/CustomContainers/FieldErrorContainer";
import { ContactDetailsForm } from "@/typings";
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

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // add them to images list ( accepted and rejected )
      const badFiles = rejectedFiles.map(({ file }) => file);
      const currentImages = getValues("images") || [];
      const allImages = [
        ...badFiles,
        ...currentImages,
        ...acceptedFiles,
      ]
      // make the images unique
      const updatedImages = allImages.filter(
        (file, index, self) =>
          index === self.findIndex((f) => f.name === file.name)
      );
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
          <p className="text-sm">Weka picha hapa...</p>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-sm">Bofya hapa kuweka picha</p>
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
