import { Button } from "@headlessui/react";
import clsx from "clsx";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "neutral" | "plane" | "text";
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
        "rounded flex items-center gap-2 py-2 px-4 font-semibold cursor-pointer text-white outline-none data-[disabled]:opacity-90",
        className,
        variant === "primary" && "bg-spanish-violet hover:bg-spanish-violet/90",
        variant === "neutral" && "bg-neutral-500 data-[hover]:bg-neutral-600",
        variant === "plane" &&
          "border border-gray-500 data-[hover]:ring data-[hover]:ring-gray-600 !text-black bg-inherit",
        variant === "text" &&
          "!text-spanish-violet !py-0 !px-0 !bg-transparent underline hover:underline-offset-2"
      )}
    >
      {children}
      {value}
    </Button>
  );
}
