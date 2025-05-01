import { FormInputField } from "@/typings";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import { HTMLInputTypeAttribute, useState } from "react";

type Props = Omit<FormInputField ,'label'>

export default function CustomInputElement({ ...field }: Props) {
  const [dynamicPasswordType, setDynamicPasswordType] =
    useState<Extract<HTMLInputTypeAttribute, "password" | "text">>("password");

  const togglePasswordHandler = () => {
    setDynamicPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <>
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
    </>
  );
}
