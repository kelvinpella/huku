import { ComponentsWithMenu, CustomMenuItem } from "@/typings";
import { profileMenuItems } from "../data/profileMenuItems";
import { signupMenuItems } from "../data/signupMenuItems";
import { loginMenuItems } from "../data/loginMenuItems";
/**
 * Retrieves the menu items associated with a specific component.
 *
 * @param componentName - The name of the component for which to get menu items.
 * @returns An array of `CustomMenuItem` objects corresponding to the given component.
 */

export function getMenuItems(componentName: ComponentsWithMenu) {
  const componentToMenuItems: Record<ComponentsWithMenu, CustomMenuItem[]> = {
    profile: profileMenuItems,
    signup: signupMenuItems,
    login: loginMenuItems,
  };

  return componentToMenuItems[componentName];
}
