import { FormInputField } from "@/typings";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { HTMLInputTypeAttribute, useState } from "react";

type Props = FormInputField & {
  errorMessage: string | undefined;
};

export default function CustomInputElement({
  label,
  errorMessage,
  hidden,
  ...field
}: Props) {
  const [dynamicPasswordType, setDynamicPasswordType] =
    useState<Extract<HTMLInputTypeAttribute, "password" | "text">>("password");

  const togglePasswordHandler = () => {
    setDynamicPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <div className={clsx("w-full flex flex-col gap-1", hidden && "hidden")}>
      <Field className="w-full flex flex-col gap-2 py-2">
        <Label htmlFor={field.id} className="font-semibold text-lg py-2">
          {label}
        </Label>
        <div className="w-full relative">
          <Input
            {...field}
            type={field.type === "password" ? dynamicPasswordType : field.type}
            className={clsx(
              "w-full py-2.5 px-6 outline-none border border-black rounded focus:ring focus:ring-black",
              field.type === "password" && "pr-20"
            )}
          />
          {field.type === "password" && (
            <button
              type="button"
              onClick={togglePasswordHandler}
              className="w-18 text-xs text-center absolute inset-y-0 right-0 px-2 border-l border-l-gray-500/50 font-semibold hover:text-spanish-violet cursor-pointer"
            >
              {dynamicPasswordType === "password" ? "Onyesha" : "Ficha"}
            </button>
          )}
        </div>
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
