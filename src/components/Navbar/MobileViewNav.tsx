import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import NavItems from "./NavItems";
import { MdMenuOpen } from "react-icons/md";
import AppRelatedMenuItems from "./AppRelatedMenuItems";
import Profile from "./Profile";

export default function MobileViewNav() {
  return (
    <div className="flex items-center justify-between lg:hidden">
      <NavItems />
      <Popover className={"relative"}>
        <PopoverButton
          className={"flex items-center justify-center outline-none focus:scale-110"}
        >
          <MdMenuOpen size={30} />
        </PopoverButton>
        <PopoverPanel className="customCard menuItemsContainer top-10 left-auto right-0 flex flex-col gap-2">
          <Profile popOver />
          <AppRelatedMenuItems />
        </PopoverPanel>
      </Popover>
    </div>
  );
}
