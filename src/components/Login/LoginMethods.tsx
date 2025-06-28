import { AuthPageParam } from "@/typings";
import { use } from "react";
import LoginForm from "./LoginForm";
import AuthLoginOptionsWrapper from "./AuthLoginOptionsWrapper";
import { getMenuItems } from "@/common/functions/getMenuItems";
type Props = {
  loginOptionPromise?: AuthPageParam<"login">;
};
export default function LoginMethods({ loginOptionPromise }: Props) {
  if (loginOptionPromise) {
    const { option } = use(loginOptionPromise);
    return <LoginForm loginOption={option} />;
  }

  const loginMethods = getMenuItems("login");

  const loginMethodsToShow = loginMethods.filter(
    ({ id }) => id === "phone" || id === "email"
  );

  return <AuthLoginOptionsWrapper options={loginMethodsToShow} />;
}
