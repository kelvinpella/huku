"use server";

import { LoginOption, UserLoginForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

export const loginAction = async (
  formValues: UserLoginForm,
  loginOption: LoginOption
) => {
  const supabase = await createClient();

  const { password, email, phone } = formValues;

  const commonCredentials = {
    password,
  };

  let credentials: SignUpWithPasswordCredentials;

  if (loginOption === "email") {
    credentials = { ...commonCredentials, email: email as string };
  } else {
    credentials = { ...commonCredentials, phone: phone as string };
  }

  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  console.log("data", data, "error", error);
};
