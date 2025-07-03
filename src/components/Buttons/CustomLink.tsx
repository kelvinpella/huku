import { Variant } from "@/typings";
import clsx from "clsx";
import Link from "next/link";
import React, { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  variant?: Variant;
};

export default function CustomLink({
  variant = "primary",
  href,
  children,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "rounded flex items-center gap-2 py-2 px-4 font-semibold whitespace-nowrap cursor-pointer text-white outline-none data-[disabled]:opacity-90",
        className,
        variant === "primary" && "bg-spanish-violet hover:bg-spanish-violet/90",
        variant === "neutral" && "bg-neutral-500 data-[hover]:bg-neutral-600",
        variant === "plain" &&
          "!py-0 !px-0 !bg-transparent !text-black !font-normal",
        variant === "outline" &&
          "border border-gray-500 hover:ring hover:ring-gray-600 !text-black bg-inherit"
      )}
    >
      {children}
    </Link>
  );
}
