import { ComponentsWithMenu, CustomMenuItem } from "@/typings";
import { profileMenuItems } from "../data/profileMenuItems";
import { signupMenuItems } from "../data/signupMenuItems";
import { loginMenuItems } from "../data/loginMenuItems";

export function getMenuItems(componentName: ComponentsWithMenu) {
  const componentToMenuItems: Record<ComponentsWithMenu, CustomMenuItem[]> = {
    profile: profileMenuItems,
    signup: signupMenuItems,
    login: loginMenuItems,
  };

  return componentToMenuItems[componentName];
}
