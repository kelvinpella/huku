import { FormInputField } from "@/typings";
import { Field, Label } from "@headlessui/react";
import clsx from "clsx";
import CustomSelectElement from "./CustomSelectElement";
import CustomInputElement from "./CustomInputElement";
import { tanzaniaRegions } from "@/common/data/tanzaniaRegions";
import FieldErrorContainer from "../CustomContainers/FieldErrorContainer";
import CustomTextAreaElement from "./CustomTextAreaElement";

type Props = FormInputField & {
  errorMessage: string | undefined;
  visualInputSize?: "small" | "normal";
};

export default function CustomField({
  label,
  visualInputSize,
  errorMessage,
  hidden,
  ...field
}: Props) {
  const inputSize = visualInputSize ?? "normal";

  let customFieldToShow = (
    <CustomInputElement {...field} inputSize={inputSize} />
  );
  if (field.name === "location")
    customFieldToShow = (
      <CustomSelectElement {...field} selectOptions={tanzaniaRegions} />
    );
  if (field.name === "description")
    customFieldToShow = <CustomTextAreaElement {...field} />;

  return (
    <div className={clsx("w-full flex flex-col gap-1", hidden && "hidden")}>
      <Field
        className={clsx(
          "w-full flex flex-col gap-2 ",
          inputSize === "normal" ? "py-2" : "pt-2 pb-0"
        )}
      >
        <Label
          htmlFor={field.id}
          className={clsx(
            "font-semibold ",
            inputSize === "normal" ? "text-lg py-2" : "text-base"
          )}
        >
          {label}
        </Label>
        <div className="w-full relative">{customFieldToShow}</div>
      </Field>
      <FieldErrorContainer errorMessage={errorMessage} />
    </div>
  );
}
