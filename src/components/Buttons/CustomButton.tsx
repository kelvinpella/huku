import { Button } from "@headlessui/react";
import clsx from "clsx";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "neutral";
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
        "rounded flex items-center gap-1 py-2 px-4 font-semibold cursor-pointer text-white outline-none data-[disabled]:opacity-90",
        className,
        variant === "primary" && "bg-spanish-violet hover:bg-spanish-violet/90",
        variant === "neutral" && "bg-neutral-500 data-[hover]:bg-neutral-600"
      )}
    >
      {children}
      {value}
    </Button>
  );
}
