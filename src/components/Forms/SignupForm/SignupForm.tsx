import { getSignupSteps } from "@/common/functions/getSignupSteps";
import {
  AuthFormField,
  AuthFormState,
  FormActionPayload,
  SignupOption,
} from "../../../typings";
import { useActionState, useMemo, useState } from "react";
import CustomInputElement from "../CustomInputElement";
import { signupFormInputValidation } from "@/common/actions/signupAction";
import { authFormInitialState } from "@/common/data/authFormInitialState";
import SignupFormButtons from "./SignupFormButtons";

type Props = {
  signupOption: SignupOption;
  formFields: AuthFormField[];
};
export default function SignupForm({ signupOption, formFields }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [formValidationState, signupFormInputValidationAction] = useActionState<
    AuthFormState,
    FormActionPayload
  >(signupFormInputValidation, authFormInitialState);

  const formInputElements = useMemo(() => {
    return formFields.map((field) => {
      const signupSteps = getSignupSteps(signupOption);
      const visibleFields = signupSteps[currentStepIndex];
      const isVisibleField = visibleFields.includes(field.id);

      return (
        <CustomInputElement
          key={field.id}
          isVisibleField={isVisibleField}
          {...field}
        />
      );
    });
  }, [formFields, signupOption, currentStepIndex]);

  return (
    <div className="customCard w-full md:w-2/3 md:mx-auto lg:mx-0 my-10 py-5 md:py-8 px-4 md:px-6 shadow-md">
      <form className="flex flex-col gap-4">
        {formInputElements}
        <SignupFormButtons
          signupFormInputValidationAction={signupFormInputValidationAction}
          signupStepsState={{ currentStepIndex, setCurrentStepIndex }}
          signupOption={signupOption}
        />
      </form>
    </div>
  );
}
