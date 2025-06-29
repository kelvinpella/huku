import { additionalAppRelatedMenuItems } from "@/common/data/additionalAppRelatedMenuItems";
import { getRenderedLinkOrButtonMenuItem } from "@/common/functions/getRenderedLinkOrButtonMenuItem";
import { CustomMenuItem } from "@/typings";
import {v4 as uuid4} from 'uuid'

export default function AppRelatedMenuItems() {
  const buttonClickHandler = (actionName: CustomMenuItem["action"]) => {
    console.log("actionName", actionName);
  };

  const items = additionalAppRelatedMenuItems.map((item) => {
    const linkOrButton = getRenderedLinkOrButtonMenuItem(
      item,
      buttonClickHandler
    );
    return <div key={uuid4()} className="p-1 hover:bg-purple-illusionist rounded">{linkOrButton}</div>;
  });

  return <div className="w-full flex flex-col gap-2">{items}</div>;
}
