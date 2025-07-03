import { getMenuButtonContent } from "@/common/functions/getMenuButtonContent";
import { getMenuItems } from "@/common/functions/getMenuItems";
import { getRenderedLinkOrButtonMenuItem } from "@/common/functions/getRenderedLinkOrButtonMenuItem";
import { ComponentsWithMenu, CustomMenuItem } from "@/typings";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  componentName: ComponentsWithMenu;
  buttonClickHandler: (actionName: CustomMenuItem["action"]) => void;
  openByDefault?: boolean;
  containerClassName?: string;
};

export default function CustomMenu({
  componentName,
  openByDefault,
  buttonClickHandler,
  containerClassName,
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
    <Menu as={"div"} className="relative w-full">
      <MenuButton
        ref={buttonRef}
        className="w-full outline-none flex items-center font-semibold cursor-pointer"
      >
        {buttonContent}
      </MenuButton>
      <MenuItems
        className={clsx("customCard menuItemsContainer", containerClassName)}
      >
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
