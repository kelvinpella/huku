import { CustomMenuItem } from "@/typings";
import { MdLightbulb, MdOutlineAdd } from "react-icons/md";

export const additionalAppRelatedMenuItems: CustomMenuItem[] = [
  {
    name: "Weka Tangazo",
    id: "weka-tangazo",
    action: "weka-tangazo",
    icon: <MdOutlineAdd size={20} className="text-green-500" />,
  },
  {
    name: "Toa Maoni",
    id: "maoni",
    action: "maoni",
    icon: <MdLightbulb size={20} className="text-yellow-500" />,
  },
];
