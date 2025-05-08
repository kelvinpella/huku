import { AuthOption } from "@/typings";
import { createClient } from "@/utils/supabase/client";

/**
 * Function to handle social login with Supabase
 * @param provider - The social provider to use for authentication
 */
export const signInWithSocialProvider = async (
  provider: Extract<AuthOption, "facebook" | "google">
) => {
  const supabase = createClient();

  const origin = window.location.origin;

  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
};
