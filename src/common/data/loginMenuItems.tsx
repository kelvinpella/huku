import { CustomMenuItem, MenuItemAction, MenuItemLink } from "@/typings";
import { signupMenuItems } from "./signupMenuItems";

/**
 * Generates an array of login menu items based on the `signupMenuItems` array.
 * 
 * For each item in `signupMenuItems`, this mapping:
 * - Updates the `name` property to a localized string for login context.
 * - For items with `id` of "phone" or "email", sets the `link` property to a login-specific path.
 * - Returns a new menu item object with the appropriate type (`MenuItemLink` or `MenuItemAction`).
 *
 * @remarks
 * The mapping relies on the `id` property of each item to determine the new name and whether to add a login link.
 * 
 * @see signupMenuItems
 * @see CustomMenuItem
 * @see MenuItemLink
 * @see MenuItemAction
 */

export const loginMenuItems = signupMenuItems.map((item) => {
  const newNames: Record<CustomMenuItem["id"], string> = {
    phone: "Continue with phone number",
    email: "Continue with email address",
    google: "Continue with Google",
    // facebook: "Continue with Facebook",
  };

  if (item.id === "phone" || item.id === "email") {
    return {
      ...item,
      link: `login/${item.id}`,
      name: newNames[item.id],
    } as CustomMenuItem & MenuItemLink;
  }
  return { ...item, name: newNames[item.id] } as CustomMenuItem &
    MenuItemAction;
});
