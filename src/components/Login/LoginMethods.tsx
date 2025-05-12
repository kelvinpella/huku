import { AuthOption, AuthPageParam } from "@/typings";
import { use } from "react";
import LoginForm from "./LoginForm";
import { useRouter } from "next/navigation";
import { getAuthOptions } from "@/common/functions/getAuthOptions";
import AuthLoginOptionsWrapper from "./AuthLoginOptionsWrapper";
type Props = {
  loginOptionPromise?: AuthPageParam<"login">;
};
export default function LoginMethods({ loginOptionPromise }: Props) {
  const router = useRouter();

  const loginMethods = getAuthOptions({
    // phone: "Endelea na namba ya simu",
    email: "Endelea na barua pepe",
  });

  if (loginOptionPromise) {
    const { option } = use(loginOptionPromise);
    return <LoginForm loginOption={option} />;
  }

  const loginBySelectedMethod = (method: AuthOption) => {
    router.push(`/login/${method}`);
  };

  return (
      <AuthLoginOptionsWrapper
        options={loginMethods}
        buttonClickHandler={loginBySelectedMethod}
      /> 
  );
}
