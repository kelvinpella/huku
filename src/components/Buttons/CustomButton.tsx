import { Variant } from "@/typings";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: Variant;
  children?: React.ReactNode;
};

export default function CustomButton({
  variant = "primary",
  children,
  value,
  className,
  ...buttonAttributes
}: Props) {
  return (
    <Button
      {...buttonAttributes}
      className={clsx(
        "rounded flex items-center gap-2 py-2 px-4 font-semibold whitespace-nowrap cursor-pointer text-white outline-none data-[disabled]:opacity-90 data-[disabled]:cursor-not-allowed",
        className,
        variant === "primary" && "bg-spanish-violet hover:bg-spanish-violet/90",
        variant === "danger" && "bg-red-500 hover:bg-red-600",
        variant === "neutral" && "bg-neutral-500 data-[hover]:bg-neutral-600",
        variant === "outline" &&
          "border border-gray-500 data-[hover]:ring data-[hover]:ring-gray-600 !text-black bg-inherit",
        variant === "plain" &&
          "!py-0 !px-0 !bg-transparent !text-black !font-normal"
      )}
    >
      {children}
      {value}
    </Button>
  );
}
