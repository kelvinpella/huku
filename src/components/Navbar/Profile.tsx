import { profileMenuItems } from "@/common/data/profileMenuItems";
import { v4 as uuid4 } from "uuid";
import CustomMenu from "../Menu/CustomMenu";
import { getRenderedLinkOrButtonMenuItem } from "@/common/functions/getRenderedLinkOrButtonMenuItem";

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

  if (popOver)
    return profileItems.map((item) => (
      <div
        key={uuid4()}
        className="p-1 hover:bg-purple-illusionist rounded"
      >
        {item}
      </div>
    ));

  return (
    <CustomMenu
      componentName={"profile"}
      buttonClickHandler={handleButtonClick}
      containerClassName="top-14 left-auto right-0"
    />
  );
}
