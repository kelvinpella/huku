import {
  MultiStepFormNavigation,
  AuthOption,
  AuthForm,
} from "../../../typings";
import { useSignupSteps } from "@/common/hooks/useSignupSteps";
import { useForm } from "react-hook-form";
import { authFormInputFields } from "@/common/data/formInputFields";
import SignupFormButtons from "./SignupFormButtons";
import { navigateMultiStepForm } from "@/common/functions/navigateMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSignupFormSchema } from "@/lib/schema/validationSchema";
import { signupAction } from "@/common/actions/signupAction";
import AuthFormCard from "@/components/CustomContainers/AuthFormCard";
import CustomField from "../CustomField";
import { toastNotification } from "@/common/functions/toastNotification";
import { useRouter } from "next/navigation";
import { authFormInitialValues } from "@/common/data/authFormInitialValues";

type Props = {
  signupOption: AuthOption;
};
export default function SignupForm({ signupOption }: Props) {
  const router = useRouter();
  const signupFormSchema = getSignupFormSchema(signupOption);

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: authFormInitialValues,
    resolver: zodResolver(signupFormSchema),
  });

  const {
    currentStepInputFields,
    isFirstStep,
    isFinalStep,
    setCurrentStepIndex,
  } = useSignupSteps(signupOption);

  const getInputFields = () => {
    return authFormInputFields.map((field) => {
      const isCurrentField = currentStepInputFields.includes(field.name);
      const errorMessage = errors[field.name]?.message;

      return (
        <CustomField
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

  const signupUser = async (values: AuthForm) => {
    const { error } = await signupAction(values, signupOption);
    if (error) {
      toastNotification({
        args: [
          "Registration failed. Please try again.",
          {
            type: "error",
          },
        ],
      });

      return;
    }

    toastNotification({
      args: ["Registration successful!", { type: "success" }],
    });

    // Redirect to the jobs page upon successful registration
    router.push("/jobs");
  };

  const goToStep = async (step: MultiStepFormNavigation) => {
    const completed = await navigateMultiStepForm(step, trigger, {
      isFinalStep,
      isFirstStep,
      setCurrentStepIndex,
      currentStepInputFields,
    });

    // handle submission if completed
    if (completed) handleSubmit((values) => signupUser(values))();
  };

  const renderedInputFields = getInputFields();

  // TODO: [Enhancement] - Implement transitions between form steps for improved user experience.
  return (
    <AuthFormCard>
      <form
        onSubmit={(e) => {
          // Prevent default form submission; handled via step navigation
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
    </AuthFormCard>
  );
}
