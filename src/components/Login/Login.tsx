"use client";

import { AuthPageParam } from "@/typings";
import AuthPageContainer from "../containers/AuthPageContainer";
import AuthFormCard from "../containers/AuthFormCard";
import LoginMethods from "./LoginMethods";
import SocialLogin from "./SocialLogin";

type Props = {
  loginOptionPromise?: AuthPageParam<"login">;
};
export default function Login({ loginOptionPromise }: Props) {
  const bannerText = loginOptionPromise
    ? {
        firstText: "Facebook au Google,",
        secondText: "Au jaza fomu!",
      }
    : {
        firstText: "Karibu tena Huku,",
        secondText: "Endelea tafadhali!",
      };
  return (
    <AuthPageContainer bannerText={bannerText}>
      <AuthFormCard>
        <SocialLogin/>
        <LoginMethods loginOptionPromise={loginOptionPromise} />
      </AuthFormCard>
    </AuthPageContainer>
  );
}
