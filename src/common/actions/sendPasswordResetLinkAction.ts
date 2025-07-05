"use server";

import { UserLoginForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";
/**
 * Sends a password reset link to the specified user's email address using Supabase authentication.
 *
 * @param values - An object containing the user's email address.
 * @param redirectPath - The URL to redirect the user to after they reset their password.
 * @returns A promise that resolves with the result of the Supabase password reset request.
 *
 * @remarks
 * This function uses the Supabase client to trigger the password reset email.
 * The `redirectTo` parameter specifies where the user will be redirected after completing the password reset.
 */

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
