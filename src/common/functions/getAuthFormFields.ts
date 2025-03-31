import { FormInputField, SignupOption } from "../../typings";
import { formInputFields } from "../data/formInputFields";

/**
 * Get form fields for a particular selected signup option
 * @param signupOption - selected signup option
 * @returns a list of selected form fields
 */
export const getAuthFormFields = (signupOption: SignupOption) => {
  const signupOptionFormFieldsMap: Record<
    SignupOption,
    () => FormInputField[]
  > = {
    phone: () => formInputFields.filter(({ id }) => id !== "email"),
    email: () => formInputFields.filter(({ id }) => id !== "phone"),
    facebook: () => formInputFields.filter(({ id }) => id === "location"),
    google: () => formInputFields.filter(({ id }) => id === "location"),
  };

  const formFields = signupOptionFormFieldsMap[signupOption]();

  return formFields;
};
