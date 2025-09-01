import { ComponentsWithMenu } from "@/typings";
import { JSX } from "react";
import { FaChevronDown } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

export const getMenuButtonContent = (componentName: ComponentsWithMenu) => {
  const componentToButtonContent: Record<
    ComponentsWithMenu,
    () => JSX.Element
  > = {
    signup: () => (
      <div className="w-full flex items-center justify-between py-2.5 px-6 font-semibold bg-spanish-violet hover:bg-spanish-violet/90 focus:ring-2 focus:ring-purple-illusionist/50 rounded text-white">
        <span>Select a sign up method</span>
        <span>
          <FaChevronDown />
        </span>
      </div>
    ),
    profile: () => (
      <div className="flex items-center hover:scale-110">
        <RxAvatar size={24} className="text-spanish-violet " />
      </div>
    ),
    login: () => <></>,
  };

  return componentToButtonContent[componentName]();
};
