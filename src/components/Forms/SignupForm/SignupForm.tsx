import {
  MultiStepFormNavigation,
  AuthOption,
  BasicForm,
} from "../../../typings";
import { useSignupSteps } from "@/common/hooks/useSignupSteps";
import { useForm } from "react-hook-form";
import { formInputFields } from "@/common/data/formInputFields";
import SignupFormButtons from "./SignupFormButtons";
import { navigateMultiStepForm } from "@/common/functions/navigateMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicFormInitialValues } from "@/common/data/basicFormInitialValues";
import { getSignupFormSchema } from "@/lib/schema/validationSchema";
import { signupAction } from "@/common/actions/signupAction";
import AuthFormCard from "@/components/containers/AuthFormCard";
import CustomField from "../CustomField";
import { toastNofication } from "@/common/functions/toastNotification";
import { useRouter } from "next/navigation";

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

  const signupUser = async (values: BasicForm) => {
    const { error } = await signupAction(values, signupOption);
    if (error) {
      toastNofication("Imeshindikana kujiunga. Jaribu tena!", {
        type: "error",
      });

      return;
    }

    toastNofication("Umefanikiwa kujiunga!", { type: "success" });

    // redirect to the posts page
    router.push("/posts");
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

  // TODO:[Enhancement] - Add transition between steps of form completion.
  return (
    <AuthFormCard>
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
    </AuthFormCard>
  );
}
