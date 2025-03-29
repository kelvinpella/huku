import {
  AuthFormField,
  AuthFormState,
  FormActionPayload,
  SignupOption,
} from "../../../typings";
import { useActionState, useMemo } from "react";
import CustomInputElement from "../CustomInputElement";
import { signupFormInputValidation } from "@/common/actions/signupAction";
import { authFormInitialState } from "@/common/data/authFormInitialState";
import SignupFormButtons from "./SignupFormButtons";
import { useSignupSteps } from "@/common/hooks/useSignupSteps";

type Props = {
  signupOption: SignupOption;
  formFields: AuthFormField[];
};
export default function SignupForm({ signupOption, formFields }: Props) {
  const [
    formInputValidationState,
    signupFormInputValidationAction,
    isPendingInputValidation,
  ] = useActionState<AuthFormState, FormActionPayload>(
    signupFormInputValidation,
    authFormInitialState
  );

  const {
    currentStepIndex,
    setCurrentStepIndex,
    signupSteps,
    isFinalStep,
    currentStepInputFields,
  } = useSignupSteps(formInputValidationState, signupOption);

  const formInputElements = useMemo(() => {
    return formFields.map((field) => {
      const visibleFields = signupSteps[currentStepIndex];
      const isVisibleField = visibleFields.includes(field.name);
      const defaultValue = formInputValidationState?.inputs?.get?.(field.name) as
        | string
        | undefined;
      const fieldError = formInputValidationState?.fieldErrors?.[field.name];
      return (
        <CustomInputElement
          key={field.id}
          {...field}
          defaultValue={defaultValue}
          isVisibleField={isVisibleField}
          fieldError={fieldError}
        />
      );
    });
  }, [formFields, signupSteps, formInputValidationState, currentStepIndex]);

  const signupFormButtonsProps = {
    signupFormInputValidationAction,
    isPendingInputValidation,
    currentStepIndex,
    setCurrentStepIndex,
    isFinalStep,
    formInputValidationState,
    currentStepInputFields,
  };

  // TODO replace this form with Formik in order to handle validations and other issues seamlessly 
  return (
    <div className="customCard w-full md:w-2/3 md:mx-auto lg:mx-0 my-10 py-5 md:py-8 px-4 md:px-6 shadow-md">
      <form className="flex flex-col gap-2" noValidate>
        {formInputElements}
        <SignupFormButtons {...signupFormButtonsProps} />
      </form>
    </div>
  );
}
