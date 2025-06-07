"use server";

import { LoginOption, UserLoginForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { formatPhoneNumber } from "../functions/formatPhoneNumber";

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
    const formattedPhone = formatPhoneNumber(phone as string);
    credentials = { ...commonCredentials, phone: formattedPhone };
  }

  return await supabase.auth.signInWithPassword(credentials);
};
