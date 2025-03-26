import { AuthFormField, SignupOption,  } from "@/typings";
import { authFormFields } from "../data/authFormFields";

/**
 * Get form fields for a particular selected signup option
 * @param signupOption - selected signup option 
 * @returns a list of selected form fields
 */
export const getAuthFormFields = (signupOption: SignupOption) => {
 
    const signupOptionFormFieldsMap: Record<SignupOption, () => AuthFormField[]> = {
        phone: () => authFormFields.filter(({ id }) => id !== 'email'),
        email: () => authFormFields.filter(({ id }) => id !== 'phone'),
        facebook: () => authFormFields.filter(({ id }) => id === 'location'),
        google: () => authFormFields.filter(({ id }) => id === 'location'),
    }

    const formFields = signupOptionFormFieldsMap[signupOption]()

    return formFields

}