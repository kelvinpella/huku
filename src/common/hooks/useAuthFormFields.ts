import { AuthFormField, SignupOption, SignupOptionParam } from "@/typings";
import { use } from "react";
import { authFormFields } from "../data/authFormFields";

/**
 * Get form fields for a particular selected signup option
 * @param signupOptionPromise - selected signup option promise
 * @returns a list of selected form fields
 */
export const useAuthFormFields = (signupOptionPromise: SignupOptionParam) => {

    const { option: signupOption } = use(signupOptionPromise)

    const signupOptionFormFieldsMap: Record<SignupOption, () => AuthFormField[]> = {
        phone: () => authFormFields.filter(({ id }) => id !== 'email'),
        email: () => authFormFields.filter(({ id }) => id !== 'phone'),
        facebook: () => authFormFields.filter(({ id }) => id === 'location'),
        google: () => authFormFields.filter(({ id }) => id === 'location'),
    }

    const formFields = signupOptionFormFieldsMap[signupOption]()

    return formFields

}