"use client";

import { AuthPageParam } from "@/typings";
import AuthPageContainer from "../containers/AuthPageContainer";
import AuthFormCard from "../containers/AuthFormCard";
import LoginMethods from "./LoginMethods";

type Props = {
  loginOptionPromise?: AuthPageParam<"login">;
};
export default function Login({ loginOptionPromise }: Props) {
  const bannerText = loginOptionPromise
    ? {
        firstText: "Jaza fomu,",
        secondText: "Au chagua njia nyingine!",
      }
    : {
        firstText: "Karibu tena Huku,",
        secondText: "Endelea tafadhali!",
      };
  return (
    <AuthPageContainer bannerText={bannerText}>
      <AuthFormCard>
        <LoginMethods loginOptionPromise={loginOptionPromise} />
      </AuthFormCard>
    </AuthPageContainer>
  );
}
