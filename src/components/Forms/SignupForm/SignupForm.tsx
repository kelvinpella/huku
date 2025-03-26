import { getSignupSteps } from "@/common/functions/getSignupSteps";
import { AuthFormField, SignupOption } from "@/typings"
import { useMemo } from "react";

type Props = {
    signupOption:SignupOption;
    formFields:AuthFormField[]
}
export default function SignupForm({signupOption,formFields}:Props) {

    const signupSteps = useMemo(()=>getSignupSteps(signupOption),[signupOption])
 

  return (
    <div>SignupForm:</div>
  )
}
