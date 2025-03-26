import { getSignupSteps } from "@/common/functions/getSignupSteps";
import { AuthFormField, SignupOption } from "@/typings";
import { useMemo, useState } from "react";
import CustomInputElement from "../CustomInputElement";
import CustomButton from "@/components/Buttons/CustomButton";

type Props = {
  signupOption: SignupOption;
  formFields: AuthFormField[];
};
export default function SignupForm({ signupOption, formFields }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const signupSteps = useMemo(
    () => getSignupSteps(signupOption),
    [signupOption]
  );

  const formInputElements = useMemo(() => {
    return formFields.map((field) => {
      const visibleFields = signupSteps[currentStep];
      const isVisibleField = visibleFields.includes(field.id);

      return (
        <CustomInputElement
          key={field.id}
          isVisibleField={isVisibleField}
          {...field}
        />
      );
    });
  }, [formFields, signupSteps, currentStep]);

  const isFinalStep = useMemo(
    () => currentStep === signupSteps.length - 1,
    [currentStep, signupSteps]
  );

  return (
    <div className="w-full md:w-2/3 md:mx-auto lg:mx-0 my-10 py-5 px-2">
      <form className="flex flex-col gap-4">
        {formInputElements}

        <div className="w-full flex items-center justify-between my-4 py-2">
          <CustomButton value="Rudi nyuma" variant="neutral" />
          <div className="text-end">
            <CustomButton value="Maliza" hidden={!isFinalStep} />
            <CustomButton value="Endelea" hidden={isFinalStep} />
          </div>
        </div>
      </form>
    </div>
  );
}
