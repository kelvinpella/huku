import { getSignupSteps } from "@/common/functions/getSignupSteps";
import CustomButton from "@/components/Buttons/CustomButton";
import { FormActionPayload, SignupOption } from "@/typings";
import React, { Dispatch, SetStateAction, useMemo } from "react";

type Props = {
  signupFormInputValidationAction: (payload: FormActionPayload) => void;
  signupStepsState: {
    currentStepIndex: number;
    setCurrentStepIndex: Dispatch<SetStateAction<number>>;
  };
  signupOption: SignupOption;
};
export default function SignupFormButtons({
  signupFormInputValidationAction,
  signupStepsState,
  signupOption,
}: Props) {
  const { currentStepIndex, setCurrentStepIndex } = signupStepsState;

  const { isFinalStep, currentStepInputFields } = useMemo(() => {
    const signupSteps = getSignupSteps(signupOption);

    const isFinalStep = currentStepIndex === signupSteps.length - 1;

    const currentStepInputFields = signupSteps[currentStepIndex];

    return { isFinalStep, currentStepInputFields };
  }, [currentStepIndex, signupOption]);

  return (
    <div className="w-full flex items-center justify-between my-4 py-2">
      <CustomButton value="Rudi nyuma" variant="neutral" />
      <div className="text-end">
        <CustomButton
          type={isFinalStep ? "submit" : "button"}
          hidden={!isFinalStep}
          value="Maliza"
        />
        <CustomButton
          type={isFinalStep ? "button" : "submit"}
          hidden={isFinalStep}
          value="Endelea"
          formAction={(formData: FormData) =>
            signupFormInputValidationAction({
              formData,
              currentStepInputFields,
            })
          }
        />
      </div>
    </div>
  );
}
