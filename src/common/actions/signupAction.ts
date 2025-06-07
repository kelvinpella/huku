"use server";

import { AuthOption, BasicForm } from "@/typings";
import { signUpWithSocial } from "./signUpWithSocial";
import { signUpWithEmailOrPhone } from "./signupWithEmailOrPhone";

export const signupAction = async (
  formValues: BasicForm,
  signupOption: AuthOption
) => {
  // handle signup through social networks
  if (signupOption === "facebook" || signupOption === "google") {
    return await signUpWithSocial(formValues.location as string);
  }

  return await signUpWithEmailOrPhone(formValues, signupOption);
};
