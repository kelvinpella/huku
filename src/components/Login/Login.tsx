"use client";

import { AuthPageParam } from "@/typings";
import AuthPageContainer from "../CustomContainers/AuthPageContainer";
import AuthFormCard from "../CustomContainers/AuthFormCard";
import LoginMethods from "./LoginMethods";
import SocialLogin from "./SocialLogin";
import CustomLink from "../Buttons/CustomLink";

type Props = {
  loginOptionPromise?: AuthPageParam<"login">;
};
export default function Login({ loginOptionPromise }: Props) {
  const bannerText = loginOptionPromise
    ? {
        firstText: "Facebook or Google,",
        secondText: "Or fill out the form.",
      }
    : {
        firstText: "Welcome back,",
        secondText: "Please continue!",
      };
  return (
    <AuthPageContainer bannerText={bannerText}>
      <AuthFormCard>
        <SocialLogin />
        <LoginMethods loginOptionPromise={loginOptionPromise} />
        <div className="w-full mt-8 gap-1 text-center">
          Don't have an account yet?{" "}
          <CustomLink
            variant="plain"
            href="/"
            className="!inline !font-semibold !text-spanish-violet"
          >
            Join now
          </CustomLink>
        </div>
      </AuthFormCard>
    </AuthPageContainer>
  );
}
