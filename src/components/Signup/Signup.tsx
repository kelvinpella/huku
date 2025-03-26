"use client";

import { getAuthFormFields } from "@/common/functions/getAuthFormFields";
import { SignupOptionParam } from "@/typings";
import { use, useMemo } from "react";
import SignupForm from "../Forms/SignupForm/SignupForm";

type Props = {
  signupOptionPromise: SignupOptionParam;
};
export default function Signup({ signupOptionPromise }: Props) {
  const { option: signupOption } = use(signupOptionPromise);

  const formFields = useMemo(
    () => getAuthFormFields(signupOption),
    [signupOption]
  );

  return (
    <div className="w-full">
      <SignupForm signupOption={signupOption} formFields={formFields} />
    </div>
  );
}
