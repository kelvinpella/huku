import { AuthPageParam, LoginOption } from "@/typings";
import { use } from "react";
import LoginForm from "./LoginForm";
import { FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import CustomButton from "../Buttons/CustomButton";
import { useRouter } from "next/navigation";
type Props = {
  loginOptionPromise?: AuthPageParam<"login">;
};
export default function LoginMethods({ loginOptionPromise }: Props) {
  const router = useRouter();
  const loginMethods = [
    {
      icon: <FaMobileAlt size={20} />,
      label: "Endelea na namba ya simu",
      value: "phone",
    },
    {
      icon: <MdEmail size={20} />,
      label: "Endelea na barua pepe",
      value: "email",
    },
  ] as const;

  if (loginOptionPromise) {
    const { option } = use(loginOptionPromise);
    return <LoginForm loginOption={option} />;
  }

  const loginBySelectedMethod = (method: LoginOption) => {
    router.push(`/login/${method}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      {loginMethods.map(({ label, icon, value }) => (
        <CustomButton
          key={value}
          value={label}
          onClick={() => loginBySelectedMethod(value)}
          className="whitespace-nowrap w-full"
        >
          {icon}
        </CustomButton>
      ))}
    </div>
  );
}
