import { AuthOption, BasicForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

/**
 * Signup a user with email or phone number.
 * @param formValues - The form values containing user information.
 * @param signupOption - The signup option, either "email" or "phone".
 * @returns - The result of the Supabase signUp call.
 */
export const signUpWithEmailOrPhone = async (
  formValues: BasicForm,
  signupOption: AuthOption
) => {
  const supabase = await createClient();

  const { firstname, lastname, location, email, phone, password } = formValues;

  const commonSignupInfo = {
    password: password as string,
    options: {
      data: {
        firstname,
        lastname,
        location,
      },
    },
  };

  let newUserInfo: SignUpWithPasswordCredentials;

  if (signupOption === "email") {
    // signup by email
    newUserInfo = {
      ...commonSignupInfo,
      email: email as string,
    };
  } else {
    // signup by phone
    newUserInfo = {
      ...commonSignupInfo,
      phone: phone as string,
    };
  }

  return await supabase.auth.signUp(newUserInfo);
};
