import React from "react";
import CustomLink from "../Buttons/CustomLink";

export default function Footer() {
  const footerLinks = [
    {
      title: "Sera ya Faragha",
      href: "/privacy",
    },
    {
      title: "Masharti ya Matumizi",
      href: "/terms",
    },
  ];
  return (
    <footer className="w-full">
      <div className="w-full lg:max-w-screen-2xl mx-auto flex flex-col items-center justify-center gap-4 py-6 border-t border-t-encore/20">
        <div className="flex items-center gap-4">
          {footerLinks.map(({ title, href }) => (
            <span key={title}>
              <CustomLink
                variant="plain"
                href={href}
                className="!inline !font-semibold !text-spanish-violet"
              >
                {title}
              </CustomLink>
            </span>
          ))}
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} Huku | Mfumo kutoka TEJA{" "}
        </div>
      </div>
    </footer>
  );
}
