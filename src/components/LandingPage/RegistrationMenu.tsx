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
    <div className="w-full my-10 py-5 px-2">
      <Menu as="div">
        <MenuButton
          ref={menuButtonRef}
          className="w-full flex items-center justify-between py-2.5 px-6 font-semibold outline-none bg-spanish-violet hover:bg-spanish-violet/90 focus:ring-2 focus:ring-purple-illusionist/50 rounded text-white"
        >
          <span>Jiunge sasa</span>
          <span>
            <FaChevronDown />
          </span>
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="[--anchor-gap:10px] [--anchor-padding:16px] w-full outline-none bg-dreamy-cloud/50 focus:ring focus:ring-encore/30 border border-encore/20 rounded p-1.5"
        >
          {registrationOptions.map(({ icon, value, label }) => (
            <MenuItem key={label}>
              <Link
                href={`registration/${value}`}
                className="w-full flex items-center gap-3 py-2 px-4 data-[focus]:bg-purple-illusionist"
              >
                {icon} {label}
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
