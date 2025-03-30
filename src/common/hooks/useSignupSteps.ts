import { SignupOption } from "@/typings";
import { useMemo, useState } from "react";
import { getSignupSteps } from "../functions/getSignupSteps";

/**
 * Get the signup steps, input fields for that step and so much more
 * @param signupOption  - user selected option for signing up
 * @returns an object containing signup steps, input fields and so much more
 */
export const useSignupSteps = (signupOption: SignupOption) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const stepResults = useMemo(() => {
    const signupSteps = getSignupSteps(signupOption);

    const isFirstStep = currentStepIndex <= 0;

    const isFinalStep = currentStepIndex === signupSteps.length - 1;

    const currentStepInputFields = signupSteps[currentStepIndex].fields;

    return { signupSteps, isFinalStep, currentStepInputFields, isFirstStep };
  }, [signupOption, currentStepIndex]);

  return {
    currentStepIndex,
    setCurrentStepIndex,
    ...stepResults,
  };
};
