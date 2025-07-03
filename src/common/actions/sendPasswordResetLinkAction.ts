"use server";

import { UserLoginForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";

export async function sendPasswordResetLinkAction(
  values: Pick<UserLoginForm, "email">,
  redirectPath: string
) {
  const supabase = await createClient();
  const { email } = values;
  return await supabase.auth.resetPasswordForEmail(email!, {
    redirectTo: redirectPath,
  });
}
