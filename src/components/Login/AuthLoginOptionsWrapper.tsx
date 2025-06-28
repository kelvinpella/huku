import { getRenderedLinkOrButtonMenuItem } from "@/common/functions/getRenderedLinkOrButtonMenuItem";
import { CustomMenuItem } from "@/typings";

type Props = {
  options: CustomMenuItem[];
  buttonClickHandler?: (action: CustomMenuItem["action"]) => void;
};

export default function AuthLoginOptionsWrapper({
  options,
  buttonClickHandler,
}: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 mb-6">
      {options.map((item) => {
        const linkOrButton = getRenderedLinkOrButtonMenuItem(
          item,
          buttonClickHandler,
          'outline'
        );
        return linkOrButton;
      })}
    </div>
  );
}
