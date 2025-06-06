"use client";

import { AuthPageParam } from "@/typings";
import AuthPageContainer from "../containers/AuthPageContainer";
import AuthFormCard from "../containers/AuthFormCard";
import LoginMethods from "./LoginMethods";
import SocialLogin from "./SocialLogin";
import Link from "next/link";

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
        <div className="w-full mt-8 text-center">
          Kama haujajiunga bado, <Link href="/" className="text-blue-500 hover:text-blue-600 font-semibold">Bofya hapa</Link>
        </div>
      </AuthFormCard>
    </AuthPageContainer>
  );
}
