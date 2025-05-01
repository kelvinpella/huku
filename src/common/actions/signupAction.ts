"use server";

import { AuthOption, BasicForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

export const signupAction = async (
  formValues: BasicForm,
  signupOption: AuthOption
) => {
  const supabase = await createClient();

  const { email, password, phone, firstname, lastname, location } = formValues;

  // handle signup through social networks
  if (signupOption === "facebook" || signupOption === "google") {
    console.log("social", signupOption);
    return;
  }

  const commonSignupInfo = {
    password:password as string,
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

  const { data, error } = await supabase.auth.signUp(newUserInfo);

  // TODO: Handle data and error accordingly.
  console.log("data", data, "error", error);
};
