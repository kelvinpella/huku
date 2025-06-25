import { ContactDetailsForm } from "@/typings";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import wrongImageIcon from "@/../public/images/wrong_image.png";
import CustomButton from "@/components/Buttons/CustomButton";
import { MdOutlineClose } from "react-icons/md";

export default function ImagePreview() {
  const { getValues, setValue, trigger } = useFormContext<ContactDetailsForm>();

  const deleteImageHandler = (imageName: File["name"]) => {
    const files = getValues("images") || [];
    const filteredFiles = files.filter((file) => file.name !== imageName);
    setValue("images", filteredFiles);
    trigger("images");
  };

  const images = getValues("images").map((image) => {
    const isImage = image.type.startsWith("image/");
    const src = isImage ? URL.createObjectURL(image) : wrongImageIcon;
    return (
      <div key={image.name} className="shrink-0 size-20 relative rounded-md border p-2">
        <Image
          src={src}
          alt={image.name}
          fill
          sizes="100px"
          className="size-full object-contain"
        />
        <CustomButton
          variant="plane"
          onClick={() => deleteImageHandler(image.name)}
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
