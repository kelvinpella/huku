import { useSignupSteps } from "@/common/hooks/useSignupSteps";
import CustomButton from "@/components/Buttons/CustomButton";
import { MultiStepFormNavigation } from "@/typings";
import clsx from "clsx";
import { useEffect } from "react";

type Props = {
  goToStep: (step: MultiStepFormNavigation) => void;
  signupStepsResults: Pick<
    ReturnType<typeof useSignupSteps>,
    "isFinalStep" | "isFirstStep"
  >;
};

export default function SignupFormButtons({
  goToStep,
  signupStepsResults,
}: Props) {
  const { isFinalStep, isFirstStep } = signupStepsResults;

  useEffect(() => {
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        goToStep("next");
      }
    };
    document.addEventListener("keydown", handleEnterKey);

    return () => document.removeEventListener("keydown", handleEnterKey);
  }, [goToStep]);
  
  return (
    <div className="w-full flex items-center justify-between my-4 py-2">
      <CustomButton
        value="Rudi nyuma"
        variant="neutral"
        className={clsx(isFirstStep && "invisible")}
        onClick={() => goToStep("previous")}
      />
      <CustomButton
        value={isFinalStep ? "Maliza" : "Endelea"}
        onClick={() => goToStep("next")}
      />
    </div>
  );
}
