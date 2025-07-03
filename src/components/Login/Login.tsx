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
        <SocialLogin />
        <LoginMethods loginOptionPromise={loginOptionPromise} />
        <div className="w-full mt-8 gap-1 text-center">
          Kama haujajiunga bado{" "}
          <CustomLink
            variant="plain"
            href="/"
            className="!inline !font-semibold !text-spanish-violet"
          >
            bofya hapa
          </CustomLink>
        </div>
      </AuthFormCard>
    </AuthPageContainer>
  );
}
