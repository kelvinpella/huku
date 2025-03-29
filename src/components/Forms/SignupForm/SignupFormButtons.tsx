import CustomButton from "@/components/Buttons/CustomButton";
import { AuthFormField, AuthFormState, FormActionPayload } from "@/typings";
import React, { ComponentProps } from "react";

type Props = {
  isPendingInputValidation: boolean;
  isFinalStep: boolean;
  signupFormInputValidationAction: (payload: FormActionPayload) => void;
  currentStepInputFields: AuthFormField["name"][];
  formInputValidationState: AuthFormState;
};
export default function SignupFormButtons({
  signupFormInputValidationAction,
  formInputValidationState,
  isFinalStep,
  currentStepInputFields,
  isPendingInputValidation,
}: Props) {
  // Submit button will use different attributes based on the current signup step
  // It will be used to move to series of steps to complete the form and finally submit the form
  // To submit the form, for example, we need to remove the formAction attribute
  const submitButtonAttributes: ComponentProps<typeof CustomButton> = {
    type: "submit",
    disabled: isPendingInputValidation,
    value: isFinalStep ? "Maliza" : "Endelea",
    formAction: formInputValidationState.formCompleted
      ? undefined // remove formAction attribute if the form is completed
      : (formData: FormData) =>
          signupFormInputValidationAction({
            formData,
            currentStepInputFields,
            formCompleted: isFinalStep,
          }),
  };

  return (
    <div className="w-full flex items-center justify-between my-4 py-2">
      <CustomButton value="Rudi nyuma" variant="neutral" />
      <CustomButton {...submitButtonAttributes} />
    </div>
  );
}
