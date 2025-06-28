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
      <>
        <span>Chagua njia ya kujiunga</span>
        <span>
          <FaChevronDown />
        </span>
      </>
    ),
    profile: () => <RxAvatar />,
    login: () => <></>,
  };

  return componentToButtonContent[componentName]();
};
