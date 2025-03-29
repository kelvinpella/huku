import { AuthFormState, SignupOption } from "@/typings";
import { useEffect, useMemo, useState } from "react";
import { getSignupSteps } from "../functions/getSignupSteps";

export const useSignupSteps = (
  formValidationState: AuthFormState,
  signupOption: SignupOption
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { signupSteps, isFinalStep, currentStepInputFields } = useMemo(() => {
    const signupSteps = getSignupSteps(signupOption);

    const isFinalStep = currentStepIndex === signupSteps.length - 1;

    const currentStepInputFields = signupSteps[currentStepIndex];

    return { signupSteps, isFinalStep, currentStepInputFields };
  }, [signupOption, currentStepIndex]);

  // go to the next step of filling the form or submit it when completed
  useEffect(() => {
    if (formValidationState.message === "next step") {
      // NOTE; Keep these if checks as they are to avoid unintended behaviour of index updating ahead of time.
      if (!isFinalStep) {
        // go to next step of filling the form
        setCurrentStepIndex((prevIndex) => prevIndex + 1);
      }

      if (isFinalStep && formValidationState.formCompleted) {
        // TODO remove formAction attribute to the submit button
        // TODO handle submission
        console.log("submitting");
      }
    }
  }, [formValidationState, isFinalStep]);

  return {
    currentStepIndex,
    setCurrentStepIndex,
    signupSteps,
    isFinalStep,
    currentStepInputFields,
  };
};
