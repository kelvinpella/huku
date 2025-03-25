"use client";
import { registrationOptions } from "@/common/data/registrationOptions";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function RegistrationMenu() {
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const menuButton = menuButtonRef.current;
    // set menu open by default
    menuButton?.click();
  }, []);

  return (
    <div className="relative w-full md:w-2/3 md:mx-auto lg:mx-0 my-10 py-5 px-2">
      <Menu>
        <MenuButton
          ref={menuButtonRef}
          className="w-full flex items-center justify-between py-2.5 px-6 font-semibold outline-none bg-spanish-violet hover:bg-spanish-violet/90 focus:ring-2 focus:ring-purple-illusionist/50 rounded text-white"
        >
          <span>Chagua njia ya kujiunga</span>
          <span>
            <FaChevronDown />
          </span>
        </MenuButton>
        <MenuItems 
          className="absolute inset-x-2 top-20 z-10  outline-none bg-dreamy-cloud focus:ring focus:ring-encore/30 border border-encore/20 rounded p-1.5"
        >
          {registrationOptions.map(({ icon, value, label, type = "link" }) => (
            <MenuItem
              key={label}
              as="div"
              className="w-full py-2 px-4 data-[focus]:bg-purple-illusionist rounded"
            >
              {type === "link" ? (
                <Link
                  href={`signup/${value}`}
                  className="w-full flex items-center gap-3"
                >
                  {icon} {label}
                </Link>
              ) : (
                <button className="w-full flex items-center gap-3 outline-none">
                  {icon} {label}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
