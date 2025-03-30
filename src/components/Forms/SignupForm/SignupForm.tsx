import { MultiStepFormNavigation, SignupOption } from "../../../typings";
import { useMemo } from "react";
import CustomInputElement from "../CustomInputElement";
import { useSignupSteps } from "@/common/hooks/useSignupSteps";
import { useForm } from "react-hook-form";
import { formInputFields } from "@/common/data/formInputFields";
import SignupFormButtons from "./SignupFormButtons";
import { navigateMultiStepForm } from "@/common/functions/navigateMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "@/lib/schema/validationSchema";
import { basicFormInitialValues } from "@/common/data/basicFormInitialValues";

type Props = {
  signupOption: SignupOption;
};
export default function SignupForm({ signupOption }: Props) {
  const {
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: basicFormInitialValues,
    resolver: zodResolver(signupFormSchema), 
  });

  const {
    currentStepInputFields,
    isFirstStep,
    isFinalStep,
    setCurrentStepIndex,
  } = useSignupSteps(signupOption);

  const renderedInputFields = useMemo(() => {
    return currentStepInputFields.map((fieldName) => {
      const field = formInputFields.find((field) => field.name === fieldName)!;
      const errorMessage = errors[field.name]?.message;
      return (
        <CustomInputElement
          key={fieldName}
          {...field}
          errorMessage={errorMessage}
          control={control}
        />
      );
    });
  }, [currentStepInputFields, control, errors]);

  const goToStep = (step: MultiStepFormNavigation) => {
    navigateMultiStepForm(step, trigger, {
      isFinalStep,
      isFirstStep,
      setCurrentStepIndex,
      currentStepInputFields,
    });
  };

  return (
    <div className="customCard w-full md:w-2/3 md:mx-auto lg:mx-0 my-10 py-5 md:py-8 px-4 md:px-6 shadow-md">
      <form className="flex flex-col gap-2" noValidate>
        {renderedInputFields}
        <SignupFormButtons
          signupStepsResults={{ isFinalStep, isFirstStep }}
          goToStep={goToStep}
        />
      </form>
    </div>
  );
}
