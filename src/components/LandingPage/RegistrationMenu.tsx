"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import SignupOptions from "./SignupOptions";

export default function RegistrationMenu() {
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const menuButton = menuButtonRef.current;
    // set menu open by default
    menuButton?.click();
  }, []);

  return (
    <div className="relative w-full py-5">
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
        <MenuItems className="customCard absolute inset-x-0 top-20 z-10  outline-none focus:ring focus:ring-encore/30">
          <SignupOptions />
        </MenuItems>
      </Menu>
    </div>
  );
}
