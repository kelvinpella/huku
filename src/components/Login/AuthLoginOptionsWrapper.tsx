import { getAuthOptions } from "@/common/functions/getAuthOptions";
import CustomButton from "../Buttons/CustomButton";
import { AuthOption } from "@/typings";

type Props = {
  options: ReturnType<typeof getAuthOptions>;
  buttonClickHandler: (optionValue: AuthOption) => void;
};

export default function AuthLoginOptionsWrapper({
  options,
  buttonClickHandler,
}: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {options.map(({ label, icon, value }) => (
        <CustomButton
          key={value}
          value={label}
          onClick={() => buttonClickHandler(value)}
          variant="plane"
          className="whitespace-nowrap w-full"
        >
          {icon}
        </CustomButton>
      ))}
    </div>
  );
}
