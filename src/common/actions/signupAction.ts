"use server";

import { ZodIssue } from "zod";
import { AuthFormState, BasicUserForm, FormActionPayload } from "../../typings";
import { BasicFormSchema } from "../schema/validationSchema";

export const signupFormInputValidation = async (
  formState: AuthFormState,
  { formData, currentStepInputFields }: FormActionPayload
) => {
  // password and confirmPassword fields are keys under 'passwords' object in the signupSchema
  const hasPasswordInputFields = currentStepInputFields.every(
    (field) => field === "password" || field === "confirmPassword"
  );

  const inputFieldSchemaKey = (
    hasPasswordInputFields ? ["passwords"] : currentStepInputFields
  ) as (keyof BasicUserForm)[];

  const fieldsToPick = inputFieldSchemaKey.reduce(
    (pickedInputFields, currentInputField) => {
      pickedInputFields[currentInputField] = true;
      return pickedInputFields;
    },
    {} as Record<keyof BasicUserForm, true>
  );

  // pick a validation method based on the fieldsToPick
  const currentInputFieldsValidationMethod = BasicFormSchema.pick(fieldsToPick);

  // get formData only for the inputs under validation
  const inputFieldData = currentStepInputFields.reduce(
    (partialFormData, currentInputField) => {
      partialFormData[currentInputField] = formData.get(
        currentInputField
      ) as string;

      return partialFormData;
    },
    {} as Record<(typeof currentStepInputFields)[number], string>
  );

  // modify data structure to match the validation method
  const modifiedInputFieldData = hasPasswordInputFields
    ? { passwords: inputFieldData }
    : inputFieldData;

  const validatedFieldData = currentInputFieldsValidationMethod.safeParse(
    modifiedInputFieldData
  );

  if (!validatedFieldData.success) {
    const error = validatedFieldData.error.issues;
    const fieldErrors = error.reduce((errors, currentError) => {
      const fieldId =
        currentError.path.pop() as (typeof currentStepInputFields)[number];
      errors[fieldId] = currentError.message;
      return errors;
    }, {} as Record<(typeof currentStepInputFields)[number], ZodIssue["message"]>);

    return {
      fieldErrors,
      success: false,
      inputs: formData,
      message: "Tafadhali rekebisha makosa hapo juu",
    };
  }

  return {
    success: true,
    message: "Taarifa zote zimejazwa",
  };
};
