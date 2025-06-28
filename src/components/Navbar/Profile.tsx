import { profileMenuItems } from "@/common/data/profileMenuItems";
import Link from "next/link";
import React from "react";
import CustomButton from "../Buttons/CustomButton";
import { Menu, MenuItem } from "@headlessui/react";
import CustomMenu from "../Menu/CustomMenu";
import { getRenderedLinkOrButtonMenuItem } from "@/common/functions/getRenderedLinkOrButtonMenuItem";
import { CustomMenuItem } from "@/typings";

type Props = {
  popOver?: boolean;
};

type ProfileMenuItem = (typeof profileMenuItems)[number];

export default function Profile({ popOver }: Props) {
  const handleButtonClick = (actionName: ProfileMenuItem["action"]) => {
    console.log("actionName", actionName);
  };

  const profileItems = profileMenuItems.map((item) => {
    const linkOrButton = getRenderedLinkOrButtonMenuItem(
      item,
      handleButtonClick
    );
    return linkOrButton;
  });

  if (popOver) return profileItems;

  return (
    <CustomMenu
      componentName={"profile"}
      buttonClickHandler={handleButtonClick}
    />
  );
}
