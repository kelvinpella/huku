import { BasicForm, FormInputField } from "@/typings";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { Control, Controller } from "react-hook-form";

type Props = FormInputField & {
  errorMessage: string | undefined;
  control: Control<BasicForm>;
};

export default function CustomInputElement({
  label,
  errorMessage,
  control,
  ...field
}: Props) {
  // TODO controller doesnt work
  return (
    <div className="w-full flex flex-col gap-1">
      <Controller
        name={field.name}
        control={control}
        render={({field:fieldPropsFromController}) => (
          <Field className="w-full flex flex-col gap-2 py-2">
            <Label htmlFor={field.id} className="font-semibold text-lg py-2">
              {label}
            </Label>
            <Input
              {...field}
              {...fieldPropsFromController}
              className="w-full py-2.5 px-6 outline-none border border-black rounded focus:ring focus:ring-black"
            />
          </Field>
        )}
      />
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
