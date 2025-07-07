"use server";

import { UserLoginForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";
/**
 * Resets the password for the currently authenticated user.
 *
 * @param values - An object containing the new password, picked from the UserLoginForm type.
 * @returns A promise that resolves with the result of the password update operation from Supabase.
 *
 * @remarks
 * This function uses the Supabase client to update the authenticated user's password.
 * It expects the `values` parameter to have a `password` property.
 */

export async function resetPasswordAction(
  values: Pick<UserLoginForm, "password">
) {
  const { password } = values;

  const supabase = await createClient();

  return await supabase.auth.updateUser({ password });
}
