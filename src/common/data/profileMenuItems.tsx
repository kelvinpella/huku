import { CustomMenuItem } from "@/typings";
import {
  MdOutlineDelete,
  MdOutlineLogout,
  // MdOutlineShield,
} from "react-icons/md";
/**
 * An array of menu items for the user profile menu.
 * Each item represents an action the user can take from their profile menu,
 * such as logging out or deleting their account.
 *
 * @remarks
 * - The menu items are typed as `CustomMenuItem[]`.
 * - Icons are imported from `react-icons/md`.
 * - Some menu items (e.g., password reset) are commented out and can be enabled as needed.
 *
 * @example
 * Used in profile dropdown menus to render available user actions.
 */



export const profileMenuItems: CustomMenuItem[] = [
  // {
  //   name: "Reset Password",
  //   link: "reset-password",
  //   id: "reset-password",
  //   icon: <MdOutlineShield size={20} />,
  // },
  {
    name: "Log out",
    action: "logout",
    id: "logout",
    icon: <MdOutlineLogout size={20} className="text-gray-500" />,
  },
  {
    name: "Delete Account",
    action: "delete-account",
    id: "delete-account",
    icon: <MdOutlineDelete size={20} className="text-red-500" />,
  },
];
