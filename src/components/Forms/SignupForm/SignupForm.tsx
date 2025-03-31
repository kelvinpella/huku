import { MultiStepFormNavigation, SignupOption } from "../../../typings";
import CustomInputElement from "../CustomInputElement";
import { useSignupSteps } from "@/common/hooks/useSignupSteps";
import { useForm } from "react-hook-form";
import { formInputFields } from "@/common/data/formInputFields";
import SignupFormButtons from "./SignupFormButtons";
import { navigateMultiStepForm } from "@/common/functions/navigateMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicFormInitialValues } from "@/common/data/basicFormInitialValues";
import { getSignupFormSchema } from "@/lib/schema/validationSchema";
import { signupAction } from "@/common/actions/signupAction";

type Props = {
  signupOption: SignupOption;
};
export default function SignupForm({ signupOption }: Props) {
  const signupFormSchema = getSignupFormSchema(signupOption);

  const {
    trigger,
    register,
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

  const getInputFields = () => {
    return formInputFields.map((field) => {
      const isCurrentField = currentStepInputFields.includes(field.name);
      const errorMessage = errors[field.name]?.message;
      return (
        <CustomInputElement
          key={field.name}
          {...register(field.name, {
            setValueAs: (value) => {
              if (value === "") return undefined; // to trigger required error in zod
              return value;
            },
          })}
          {...field}
          hidden={!isCurrentField}
          errorMessage={errorMessage}
        />
      );
    });
  };

  const goToStep = async (step: MultiStepFormNavigation) => {
    const completed = await navigateMultiStepForm(step, trigger, {
      isFinalStep,
      isFirstStep,
      setCurrentStepIndex,
      currentStepInputFields,
    });

    // handle submission if completed
    if (completed) handleSubmit(signupAction)();
  };

  const renderedInputFields = getInputFields();

  // TODO:[Enhancement] - Add transition between steps of form completion.
  return (
    <div className="customCard w-full md:w-2/3 md:mx-auto lg:mx-0 my-10 py-5 md:py-8 px-4 md:px-6 shadow-md">
      <form
        onSubmit={(e) => {
          // we won't be submitting it though this callback
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
        noValidate
      >
        {renderedInputFields}
        <SignupFormButtons
          signupStepsResults={{ isFinalStep, isFirstStep }}
          goToStep={goToStep}
        />
      </form>
    </div>
  );
}
