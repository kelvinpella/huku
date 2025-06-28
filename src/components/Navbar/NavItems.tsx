import Link from "next/link";
import React from "react";

export default function NavItems() {
  const navItems = [
    {
      name: "Tafuta Kazi",
      link: "jobs",
    },
    {
      name: "Kazi Ulizotangaza",
      link: "my-jobs",
    },
  ];
  return (
    <nav className="w-full flex items-center gap-4">
      {navItems.map(({ name, link }) => (
        <Link
          key={link}
          href={link}
          className="text-black font-semibold hover:text-spanish-violet"
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
