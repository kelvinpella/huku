"use client";

import { AuthPageParam, AuthOption } from "../../typings";
import { use } from "react";
import SignupForm from "../Forms/SignupForm/SignupForm";
import AuthPageContainer from "../Containers/AuthPageContainer";

type Props = {
  signupOptionPromise: AuthPageParam<"signup">;
};
export default function Signup({ signupOptionPromise }: Props) {
  const { option: signupOption } = use(signupOptionPromise);

  const getBannerText = () => {
    const signupOptionToText: Record<AuthOption, string> = {
      phone: "Simu",
      email: "Barua pepe",
      facebook: "Facebook",
      google: "Google",
    };
    return signupOptionToText[signupOption];
  };

  const bannerText = getBannerText();

  return (
    <AuthPageContainer
      bannerText={{
        firstText: "Unajiunga,",
        secondText: `Kwa njia ya ${bannerText}!`,
      }}
    >
      <SignupForm signupOption={signupOption} />
    </AuthPageContainer>
  );
}
