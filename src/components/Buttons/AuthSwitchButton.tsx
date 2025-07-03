"use client";
import { useEffect, useRef } from "react";
import CustomLink from "./CustomLink";

type AuthSwitchButtonProps = Record<"title" | "url", string>;

export default function AuthSwitchButton({
  title,
  url,
}: AuthSwitchButtonProps) {
  const authSwitchRef = useRef<HTMLDivElement | null>(null);

  // avoid losing interactivity by headlessui Menu
  useEffect(() => {
    const authSwitch = authSwitchRef.current;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const authSwitchButton = mutation.target as HTMLDivElement;
        let currentValue;
        if (mutation.attributeName === "inert") {
          currentValue = authSwitchButton.getAttribute("inert");
          if (currentValue === "") {
            authSwitchButton.removeAttribute("inert");
          }
        }
        if (mutation.attributeName === "aria-hidden") {
          currentValue = authSwitchButton.getAttribute("aria-hidden");
          if (!!currentValue) {
            authSwitchButton.removeAttribute("aria-hidden");
          }
        }
      });
    });

    if (authSwitch)
      observer.observe(authSwitch, {
        attributes: true,
        attributeFilter: ["inert", "aria-hidden"],
      });

    return () => observer.disconnect();
  }, []);
  return (
    <div ref={authSwitchRef} className="w-full py-5">
      <CustomLink href={url} variant="outline" className="w-full justify-center">
        {title}
      </CustomLink>
    </div>
  );
}
