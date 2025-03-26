"use client";

import { getAuthFormFields } from "@/common/functions/getAuthFormFields";
import { SignupOption, SignupOptionParam } from "@/typings";
import { use, useMemo } from "react";
import SignupForm from "../Forms/SignupForm/SignupForm";
import Banner from "../Banner/Banner";

type Props = {
  signupOptionPromise: SignupOptionParam;
};
export default function Signup({ signupOptionPromise }: Props) {
  const { option: signupOption } = use(signupOptionPromise);

  const formFields = useMemo(
    () => getAuthFormFields(signupOption),
    [signupOption]
  );

  const bannerText = useMemo(() => {
    const signupOptionToText: Record<SignupOption, string> = {
      phone: "Simu",
      email: "Barua pepe",
      facebook: "Facebook",
      google: "Google",
    };

    return signupOptionToText[signupOption];
  }, [signupOption]);

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center lg:grid lg:grid-cols-2 grid-rows-1 lg:justify-start lg:gap-44'>
       <Banner
        firstText={"Unajiunga,"}
        secondText={`Kwa njia ya ${bannerText}!`}
      />

      <SignupForm signupOption={signupOption} formFields={formFields} />
    </div>
  );
}
