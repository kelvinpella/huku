"use client";

import { useAuthFormFields } from "@/common/hooks/useAuthFormFields";
import { SignupOptionParam } from "@/typings";

type Props = {
  signupOptionPromise: SignupOptionParam;
};
export default function Signup({ signupOptionPromise }: Props) {
  const formFields = useAuthFormFields(signupOptionPromise);

  // TODO DELETE THIS PART
  return (
    <div>
      {formFields.map((field) => (
        <div key={field.id}>{field.id}</div>
      ))}
    </div>
  );
}
