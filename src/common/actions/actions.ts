"use server";

import { BasicUserForm, FormActionPayload } from "../../typings";
import { BasicFormSchema } from "../schema/validationSchema";

export const signupFormInputValidation = async (
  prevState: BasicUserForm,
  { formData, currentStepInputFields }: FormActionPayload
) => {
  // password and confirmPassword fields are keys under 'passwords' object in the signupSchema
  const hasPasswordInputFields = currentStepInputFields.every(
    (field) => field === "password" || field === "confirmPassword"
  );

  const inputFieldSchemaKey = (
    hasPasswordInputFields ? ["passwords"] : currentStepInputFields
  ) as (keyof BasicUserForm)[];

  // pick a validation method based on the key
  const currentInputFieldsValidationMethod = BasicFormSchema.pick(() => {
    const fieldsToPick = inputFieldSchemaKey.reduce(
      (pickedInputFields, currentInputField) => {
        pickedInputFields[currentInputField] = true;
        return pickedInputFields;
      },
      {} as Record<keyof BasicUserForm, true>
    );

    return fieldsToPick;
  });

  const inputFieldData = currentStepInputFields.reduce(
    (partialFormData, currentInputField) => {
      partialFormData[currentInputField] = formData.get(currentInputField) as string;

      return partialFormData;
    },
    {} as Record<(typeof currentStepInputFields)[number], string>
  );

  const validationResult = currentInputFieldsValidationMethod.safeParse(inputFieldData);

  return prevState;
};
