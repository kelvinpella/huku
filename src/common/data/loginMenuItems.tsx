import { CustomMenuItem } from "@/typings";
import { signupMenuItems } from "./signupMenuItems";

export const loginMenuItems = signupMenuItems.map((item) => {
  const newNames: Record<CustomMenuItem["id"], string> = {
    phone: "Endelea na namba ya simu",
    email: "Endelea na barua pepe",
    google: "Endelea na Google",
    // facebook: "Endelea na Facebook",
  };

  if (item.id === "phone" || item.id === "email") {
    return { ...item, link: `login/${item.id}`, name: newNames[item.id] };
  }
  return { ...item, name: newNames[item.id] };
}) as CustomMenuItem[];
