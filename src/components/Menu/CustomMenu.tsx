import { getMenuButtonContent } from "@/common/functions/getMenuButtonContent";
import { getMenuItems } from "@/common/functions/getMenuItems";
import { getRenderedLinkOrButtonMenuItem } from "@/common/functions/getRenderedLinkOrButtonMenuItem";
import { ComponentsWithMenu, CustomMenuItem } from "@/typings";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useRef } from "react";

type Props = {
  componentName: ComponentsWithMenu;
  buttonClickHandler: (actionName: CustomMenuItem["action"]) => void;
  openByDefault?: boolean;
};

export default function CustomMenu({
  componentName,
  openByDefault,
  buttonClickHandler,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttonContent = getMenuButtonContent(componentName);
  const menuItems = getMenuItems(componentName);

  useEffect(() => {
    const button = buttonRef.current;
    if (openByDefault && button) {
      button.click();
    }
  }, [openByDefault]);

  return (
    <Menu as={"div"} className="relative w-full py-5">
      <MenuButton
        ref={buttonRef}
        className="w-full flex items-center justify-between py-2.5 px-6 font-semibold outline-none bg-spanish-violet hover:bg-spanish-violet/90 focus:ring-2 focus:ring-purple-illusionist/50 rounded text-white"
      >
        {buttonContent}
      </MenuButton>
      <MenuItems className="customCard menuItemsContainer">
        {menuItems.map((item) => {
          const linkOrButton = getRenderedLinkOrButtonMenuItem(
            item,
            buttonClickHandler
          );
          return (
            <MenuItem
              key={item.name}
              as="div"
              className="w-full py-2 px-4 data-[focus]:bg-purple-illusionist rounded"
            >
              {linkOrButton}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
