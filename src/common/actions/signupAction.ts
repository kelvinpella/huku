"use server";

import { SafeParseError, ZodIssue } from "zod";
import { AuthFormState, BasicUserForm, FormActionPayload } from "../../typings";
import { BasicFormSchema } from "../schema/validationSchema";

const getCurrentInputFieldsValidationMethod = (
  currentStepInputFields: FormActionPayload["currentStepInputFields"],
  hasPasswordInputFields: boolean
) => {
  // get the schema key for the appropriate field to validate
  const schemaKeys = (
    hasPasswordInputFields ? ["passwords"] : currentStepInputFields
  ) as (keyof BasicUserForm)[];

  // create object for the schema keys to pick eg {firstname:true,lastname:true}
  const schemaKeysObjectToPick = schemaKeys.reduce(
    (pickedInputFields, currentInputField) => {
      pickedInputFields[currentInputField] = true;
      return pickedInputFields;
    },
    {} as Record<keyof BasicUserForm, true>
  );

  // return modified version of schema
  return BasicFormSchema.pick(schemaKeysObjectToPick);
};

const getCurrentInputFieldValidatedData = (
  hasPasswordInputFields: boolean,
  currentStepInputFields: FormActionPayload["currentStepInputFields"],
  formData: FormData,
  currentInputFieldsValidationMethod: ReturnType<
    typeof getCurrentInputFieldsValidationMethod
  >
) => {
  // get form data only for the inputs under validation
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

  return currentInputFieldsValidationMethod.safeParse(modifiedInputFieldData);
};

const getInputFieldError = (
  validatedFieldData: SafeParseError<BasicUserForm>
) => {
  const error = validatedFieldData.error.issues;

  return error.reduce((errors, currentError) => {
    const fieldId =
      currentError.path.pop() as FormActionPayload["currentStepInputFields"][number];
    errors[fieldId] = currentError.message;
    return errors;
  }, {} as Record<FormActionPayload["currentStepInputFields"][number], ZodIssue["message"]>);
};

/**
 * Validate the inputs in the signup form
 * @param formState - current form state
 * @param param1 - object containing the formData and the input fields shown in the current step
 * @returns a new formState
 */
export const signupFormInputValidation = async (
  formState: AuthFormState,
  { formData, currentStepInputFields }: FormActionPayload
) => {
  // password and confirmPassword fields are keys under 'passwords' object in the signupSchema
  const hasPasswordInputFields = currentStepInputFields.every(
    (field) => field === "password" || field === "confirmPassword"
  );

  // pick a validation method based on the current input fields
  const currentInputFieldsValidationMethod =
    getCurrentInputFieldsValidationMethod(
      currentStepInputFields,
      hasPasswordInputFields
    );

  // get validated data for the current input fields
  const validatedFieldData = getCurrentInputFieldValidatedData(
    hasPasswordInputFields,
    currentStepInputFields,
    formData,
    currentInputFieldsValidationMethod
  );

  if (!validatedFieldData.success) {
    // get field errors
    const fieldErrors = getInputFieldError(validatedFieldData);

    return {
      ...formState,
      fieldErrors,
      success: false,
      inputs: formData,
      message: "Tafadhali rekebisha makosa hapo juu",
    };
  }

  return { ...formState, success: true, message: "Taarifa zote zimejazwa" };
};
