import { FormInputField } from "@/typings";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

type Props = FormInputField & {
  errorMessage: string | undefined;
};

export default function CustomInputElement({
  label,
  errorMessage,
  ...field
}: Props) {
  // TODO [Enhancement] - Correcting input errors should update instantly as you type
  return (
    <div className="w-full flex flex-col gap-1">
      <Field className="w-full flex flex-col gap-2 py-2">
        <Label htmlFor={field.id} className="font-semibold text-lg py-2">
          {label}
        </Label>
        <Input
          {...field}
          className="w-full py-2.5 px-6 outline-none border border-black rounded focus:ring focus:ring-black"
        />
      </Field>
      <div
        id="field-error-container"
        className={clsx(
          "text-sm w-full text-red-500 h-5",
          !errorMessage && "invisible"
        )}
      >
        {errorMessage}
      </div>
    </div>
  );
}
