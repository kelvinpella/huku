import clsx from "clsx";
import Link from "next/link";
import React, { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  variant?: "primary" | "neutral" | "plane";
  className?: string;
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
        "rounded flex items-center gap-2 py-2 px-4 font-semibold cursor-pointer text-white outline-none data-[disabled]:opacity-90",
        className,
        variant === "primary" && "bg-spanish-violet hover:bg-spanish-violet/90",
        variant === "neutral" && "bg-neutral-500 data-[hover]:bg-neutral-600",
        variant === "plane" &&
          "border border-gray-500 data-[hover]:ring data-[hover]:ring-gray-600 !text-black bg-inherit"
      )}
    >
      {children}
    </Link>
  );
}
