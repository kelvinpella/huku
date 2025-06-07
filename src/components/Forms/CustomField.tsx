import { FormInputField } from "@/typings";
import { Field, Label } from "@headlessui/react";
import clsx from "clsx";
import CustomSelectElement from "./CustomSelectElement";
import CustomInputElement from "./CustomInputElement";
import { tanzaniaRegions } from "@/common/data/tanzaniaRegions";

type Props = FormInputField & {
  errorMessage: string | undefined;
};

export default function CustomField({
  label,
  errorMessage,
  hidden,
  ...field
}: Props) {

  const customFieldToShow =
    field.name === "location" ? (
      <CustomSelectElement {...field} selectOptions={tanzaniaRegions} />
    ) : (
      <CustomInputElement {...field} />
    );

  return (
    <div className={clsx("w-full flex flex-col gap-1", hidden && "hidden")}>
      <Field className="w-full flex flex-col gap-2 py-2">
        <Label htmlFor={field.id} className="font-semibold text-lg py-2">
          {label}
        </Label>
        <div className="w-full relative">{customFieldToShow}</div>
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
