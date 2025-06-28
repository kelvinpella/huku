import { additionalAppRelatedMenuItems } from "@/common/data/additionalAppRelatedMenuItems";
import { getRenderedLinkOrButtonMenuItem } from "@/common/functions/getRenderedLinkOrButtonMenuItem";
import { CustomMenuItem } from "@/typings";

export default function AppRelatedMenuItems() {
  const buttonClickHandler = (actionName: CustomMenuItem["action"]) => {
    console.log("actionName", actionName);
  };

  const items = additionalAppRelatedMenuItems.map((item) => {
    const linkOrButton = getRenderedLinkOrButtonMenuItem(
      item,
      buttonClickHandler
    );
    return linkOrButton;
  });

  return <div className="w-full flex flex-col gap-2">{items}</div>;
}
