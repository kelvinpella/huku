import CustomButton from "@/components/Buttons/CustomButton";
import CustomLink from "@/components/Buttons/CustomLink";
import { CustomMenuItem, Variant } from "@/typings";
import { v4 as uuid4 } from "uuid";

export const getRenderedLinkOrButtonMenuItem = (
  { name, link, action, icon }: CustomMenuItem,
  buttonClickHandler?: (actionName: CustomMenuItem["action"]) => void,
  variant: Variant = "plain"
) => {
  return link ? (
    <CustomLink key={uuid4()} href={link} variant={variant} className="w-full">
      {icon} {name}
    </CustomLink>
  ) : (
    <CustomButton
      key={uuid4()}
      value={name}
      onClick={() => buttonClickHandler?.(action)}
      variant={variant} className="w-full"
    >
      {icon}
    </CustomButton>
  );

  // return (
  //   <div key={uuid4()} className="flex items-center gap-2 flex-nowrap">
  //     <span>{icon}</span>
  //     <span>{linkOrButton}</span>
  //   </div>
  // );
};
