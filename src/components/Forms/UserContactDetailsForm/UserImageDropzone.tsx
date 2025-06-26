import { ContactDetailsForm } from "@/typings";
import { Controller, useFormContext } from "react-hook-form";
import ImageDropzoneField from "./ImageDropzoneField";

export default function UserImageDropzone() {
  const { control } = useFormContext<ContactDetailsForm>();

  return (
    <Controller
      name="images"
      control={control}
      render={() => <ImageDropzoneField />}
    />
  );
}
