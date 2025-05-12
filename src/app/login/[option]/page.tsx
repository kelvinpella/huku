import Login from "@/components/Login/Login";
import { AuthPageParam, LoginOption } from "@/typings";

export const dynamicParams = false;

export const generateStaticParams = () => {
  const loginOptions: LoginOption[] = [
    "email",
    // "phone"
  ];

  return loginOptions.map((option) => ({
    option,
  }));
};

export default function LoginPageWithParams({
  params,
}: {
  params: AuthPageParam<"login">;
}) {
  return <Login loginOptionPromise={params} />;
}
