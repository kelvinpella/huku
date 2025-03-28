import { getSignupSteps } from "@/common/functions/getSignupSteps";
import {
  AuthFormField,
  BasicUserForm,
  FormActionPayload,
  SignupOption, 
} from "../../../typings";
import { useActionState, useMemo, useState } from "react";
import CustomInputElement from "../CustomInputElement";
import CustomButton from "@/components/Buttons/CustomButton";
import { signupFormInitialState } from "@/common/data/signupFormInitialState"; 
import { signupFormInputValidation } from "@/common/actions/signupAction";

type Props = {
  signupOption: SignupOption;
  formFields: AuthFormField[];
};
export default function SignupForm({ signupOption, formFields }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [state, signupFormInputValidationAction] = useActionState<
    BasicUserForm,
    FormActionPayload
  >(signupFormInputValidation, signupFormInitialState);

  const signupSteps = useMemo(
    () => getSignupSteps(signupOption),
    [signupOption]
  );

  const formInputElements = useMemo(() => {
    return formFields.map((field) => {
      const visibleFields = signupSteps[currentStepIndex];
      const isVisibleField = visibleFields.includes(field.id);

      return (
        <CustomInputElement
          key={field.id}
          isVisibleField={isVisibleField}
          {...field}
        />
      );
    });
  }, [formFields, signupSteps, currentStepIndex]);

  const { isFinalStep, currentStepInputFields } = useMemo(() => {
    const isFinalStep = currentStepIndex === signupSteps.length - 1;

    const currentStepInputFields = signupSteps[currentStepIndex];

    return { isFinalStep, currentStepInputFields };
  }, [currentStepIndex, signupSteps]);


  return (
    <div className="customCard w-full md:w-2/3 md:mx-auto lg:mx-0 my-10 py-5 md:py-8 px-4 md:px-6 shadow-md">
      <form className="flex flex-col gap-4">
        {formInputElements}
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
      </form>
    </div>
  );
}
