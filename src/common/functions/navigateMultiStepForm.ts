import { BasicForm, MultiStepFormNavigation } from "@/typings";
import { useSignupSteps } from "../hooks/useSignupSteps";
import { UseFormTrigger } from "react-hook-form";

type ReturnTypeSignupStepsHook = ReturnType<typeof useSignupSteps>;

type SignupStepsResult<T extends keyof ReturnTypeSignupStepsHook> = Pick<
  ReturnTypeSignupStepsHook,
  T
>;

const handleNextStep = async (
  trigger: UseFormTrigger<BasicForm>,
  {
    isFinalStep,
    setCurrentStepIndex,
    currentStepInputFields,
  }: SignupStepsResult<
    "isFinalStep" | "setCurrentStepIndex" | "currentStepInputFields"
  >
) => {
  if (isFinalStep) {
    // submit the form
    return;
  }

  // validate the current fields
  const isValid = await trigger(currentStepInputFields, { shouldFocus: true });

  // go to next step is data is valid
  if (isValid) setCurrentStepIndex((prevIndex) => prevIndex + 1);
};

const handlePreviousStep = ({
  isFirstStep,
  setCurrentStepIndex,
}: SignupStepsResult<"isFirstStep" | "setCurrentStepIndex">) => {
  if (isFirstStep) return;
  setCurrentStepIndex((prevIndex) => prevIndex - 1);
};

export const navigateMultiStepForm = (
  step: MultiStepFormNavigation,
  trigger: UseFormTrigger<BasicForm>,
  signupStepsResult: SignupStepsResult<
    | "isFinalStep"
    | "isFirstStep"
    | "setCurrentStepIndex"
    | "currentStepInputFields"
  >
) => {
  const {
    isFinalStep,
    isFirstStep,
    setCurrentStepIndex,
    currentStepInputFields,
  } = signupStepsResult;

  if (step === "next") {
    handleNextStep(trigger, {
      isFinalStep,
      setCurrentStepIndex,
      currentStepInputFields,
    });
  } else {
    handlePreviousStep({ isFirstStep, setCurrentStepIndex });
  }
};
