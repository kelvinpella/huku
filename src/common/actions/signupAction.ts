"use server";

import { AuthOption, BasicForm } from "@/typings";
import { createClient } from "@/utils/supabase/server"; 

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

  const { data, error } = await supabase.auth.signUp({
    email: signupOption === "email" ? (email as string) : "",
    phone: signupOption === "phone" ? (phone as string) : "",
    password: password as string,
    options: {
      data: { firstname, lastname, location },
    },
  });

  // TODO: Handle data and error accordingly.
  console.log('data', data, 'error', error);
};
