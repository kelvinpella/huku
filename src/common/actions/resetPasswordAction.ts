"use server";

import { UserLoginForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";

export async function resetPasswordAction(
  values: Pick<UserLoginForm, "password">
) {
  const { password } = values;

  const supabase = await createClient();

  return await supabase.auth.updateUser({ password });
}
