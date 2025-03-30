"use client";

import { SignupOption, SignupOptionParam } from "../../typings";
import { use } from "react";
import SignupForm from "../Forms/SignupForm/SignupForm";
import Banner from "../Banner/Banner";

type Props = {
  signupOptionPromise: SignupOptionParam;
};
export default function Signup({ signupOptionPromise }: Props) {
  const { option: signupOption } = use(signupOptionPromise);

  const getBannerText = () => {
    const signupOptionToText: Record<SignupOption, string> = {
      phone: "Simu",
      email: "Barua pepe",
      facebook: "Facebook",
      google: "Google",
    };
    return signupOptionToText[signupOption];
  };

  const bannerText = getBannerText();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center lg:grid lg:grid-cols-2 grid-rows-1 lg:justify-start lg:gap-44">
      <Banner
        firstText={"Unajiunga,"}
        secondText={`Kwa njia ya ${bannerText}!`}
      />
      <SignupForm signupOption={signupOption} />
    </div>
  );
}
