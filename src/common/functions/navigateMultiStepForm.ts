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
  //TODO: [BUG] - Password & confirmPassword refine don't work. ie checking if passwords match
  // OBSERVATION: TRIGGER AND REFINE DON'T WORK TOGETHER
  // validate the current fields
  const isValid = await trigger(currentStepInputFields, { shouldFocus: true });

  if (isValid) {
    if (isFinalStep) {
      // submit the form
      return true;
    }

    // go to next step is data is valid
    setCurrentStepIndex((prevIndex) => prevIndex + 1);
  }
  return false;
};

const handlePreviousStep = ({
  isFirstStep,
  setCurrentStepIndex,
}: SignupStepsResult<"isFirstStep" | "setCurrentStepIndex">) => {
  if (isFirstStep) return;
  setCurrentStepIndex((prevIndex) => prevIndex - 1);
};

/**
 * Navigate between fields of the signup form
 * @param step - previous / next step
 * @param trigger - RHF trigger function to perform validation
 * @param signupStepsResult - Results returned by by useSignupSteps Hook
 * @returns boolean - whether the form is completed or not
 */
export const navigateMultiStepForm = async (
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

  // final state of the form
  let completed = false;

  if (step === "next") {
    completed = await handleNextStep(trigger, {
      isFinalStep,
      setCurrentStepIndex,
      currentStepInputFields,
    });
    return completed;
  } else {
    handlePreviousStep({ isFirstStep, setCurrentStepIndex });
  }

  return completed;
};
