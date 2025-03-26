import { AuthFormField } from "@/typings";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

type Props = AuthFormField & { isVisibleField: boolean };

export default function CustomInputElement({
  label,
  isVisibleField,
  ...field
}: Props) {
  return (
    <div
      className={clsx(
        "w-full flex flex-col gap-2",
        !isVisibleField && "hidden"
      )}
    >
      <Field className="w-full flex flex-col gap-4 py-2">
        <Label htmlFor={field.id} className="font-semibold text-lg py-2">
          {label}
        </Label>
        <Input
          {...field}
          className="w-full py-2.5 px-6 outline-none border border-black rounded focus:ring focus:ring-black"
        />
      </Field>
      {/* <div className="text-sm w-full text-red-500">This will be error message</div> */}
    </div>
  );
}
