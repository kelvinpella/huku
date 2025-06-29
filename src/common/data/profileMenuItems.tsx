import { CustomMenuItem } from "@/typings";
import {
  MdOutlineDelete,
  MdOutlineLogout,
  MdOutlineShield,
} from "react-icons/md";

export const profileMenuItems: CustomMenuItem[] = [
  {
    name: "Badili Nywila",
    link: "reset-password",
    id: "reset-password",
    icon: <MdOutlineShield size={20} />,
  },
  {
    name: "Ondoka (log out)",
    action: "logout",
    id: "logout",
    icon: <MdOutlineLogout size={20} className="text-gray-500" />,
  },
  {
    name: "Futa Akaunti",
    action: "delete-account",
    id: "delete-account",
    icon: <MdOutlineDelete size={20} className="text-red-500" />,
  },
];
