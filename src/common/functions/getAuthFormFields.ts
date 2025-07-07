import { authFormInputFields } from "./../data/formInputFields";
import { FormInputField, AuthOption, AuthForm } from "../../typings";

/**
 * Get form fields for a particular selected signup option
 * @param signupOption - selected signup option
 * @returns a list of selected form fields
 */
export const getAuthFormFields = (signupOption: AuthOption) => {
  const signupOptionFormFieldsMap: Record<
    AuthOption,
    () => FormInputField<AuthForm>[]
  > = {
    phone: () => authFormInputFields.filter(({ id }) => id !== "email"),
    email: () => authFormInputFields.filter(({ id }) => id !== "phone"),
    facebook: () => authFormInputFields.filter(({ id }) => id === "location"),
    google: () => authFormInputFields.filter(({ id }) => id === "location"),
  };

  const formFields = signupOptionFormFieldsMap[signupOption]();

  return formFields;
};
