"use server";

import { AuthOption, AuthForm } from "@/typings";
import { signUpWithSocial } from "./signUpWithSocial";
import { signUpWithEmailOrPhone } from "./signupWithEmailOrPhone";
/**
 * Handles user signup based on the selected authentication option.
 *
 * Depending on the `signupOption`, this function will either:
 * - Initiate signup through a social network (Facebook or Google) using `signUpWithSocial`.
 * - Or, handle signup via email or phone using `signUpWithEmailOrPhone`.
 *
 * @param formValues - The form data containing user credentials and additional information.
 * @param signupOption - The authentication method chosen by the user ("facebook", "google", "email", or "phone").
 * @returns A promise resolving to the result of the signup process.
 */


export const signupAction = async (
  formValues: AuthForm,
  signupOption: AuthOption
) => {
  // handle signup through social networks
  if (signupOption === "facebook" || signupOption === "google") {
    return await signUpWithSocial(formValues.location as string);
  }

  return await signUpWithEmailOrPhone(formValues, signupOption);
};
