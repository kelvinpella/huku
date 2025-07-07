import { CustomMenuItem } from "@/typings";
import { MdLightbulb, MdOutlineAdd } from "react-icons/md";
/**
 * An array of additional menu items related to the application.
 * 
 * Each menu item is represented as a `CustomMenuItem` object, which includes:
 * - `name`: The display name of the menu item.
 * - `id`: A unique identifier for the menu item.
 * - `action`: The action key associated with the menu item.
 * - `icon`: A React element representing the icon for the menu item.
 * 
 * Example usage:
 * ```tsx
 * additionalAppRelatedMenuItems.map(item => (
 *   <MenuItem key={item.id} icon={item.icon}>
 *     {item.name}
 *   </MenuItem>
 * ));
 * ```
 */

export const additionalAppRelatedMenuItems: CustomMenuItem[] = [
  {
    name: "Weka Tangazo",
    id: "post-job",
    link: "post-job",
    icon: <MdOutlineAdd size={20} className="text-green-500" />,
  },
  {
    name: "Toa Maoni",
    id: "feedback",
    action: "feedback",
    icon: <MdLightbulb size={20} className="text-yellow-500" />,
  },
];
