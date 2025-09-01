import Link from "next/link";
import React from "react";

export default function NavItems() {
  const navItems = [
    {
      name: "Find Jobs",
      link: "jobs",
    },
    {
      name: "Jobs You Posted",
      link: "my-jobs",
    },
  ];
  return (
    <nav className="w-full flex items-center gap-4 lg:gap-6">
      {navItems.map(({ name, link }) => (
        <Link
          key={link}
          href={`/${link}`}
          className="text-black font-semibold hover:text-spanish-violet"
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
