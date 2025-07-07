import { FormInputField } from "@/typings";
import { Textarea } from "@headlessui/react";

type Props = Omit<FormInputField, "label">;

export default function CustomTextAreaElement({ ...field }: Props) {
  return (
    <Textarea
      {...field}
      className="w-full min-h-40 py-2.5 px-6 outline-none border border-black rounded focus:ring focus:ring-black"
    ></Textarea>
  );
}
