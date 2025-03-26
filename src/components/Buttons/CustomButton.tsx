import { Button } from "@headlessui/react";
import clsx from "clsx";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "neutral";
};

export default function CustomButton({
  variant = "primary",value,
  ...buttonAttributes
}: Props) {
  return (
    <Button
      {...buttonAttributes}
      className={clsx(
        "rounded py-2 px-4 font-semibold cursor-pointer text-white outline-none",
        variant === "primary" && "bg-spanish-violet hover:bg-spanish-violet/90",
        variant === "neutral" && "bg-neutral-500 data-[hover]:bg-neutral-600"
      )}
    >
      {value}
    </Button>
  );
}
