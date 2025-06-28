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
    icon: <MdOutlineShield />,
  },
  {
    name: "Ondoka (log out)",
    action: "logout",
    id: "logout",
    icon: <MdOutlineLogout />,
  },
  {
    name: "Futa Akaunti",
    action: "delete-account",
    id: "delete-account",
    icon: <MdOutlineDelete />,
  },
];
