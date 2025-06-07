import { createClient } from "@/utils/supabase/server";

/**
 * Completes the signup process for users who signed up using social media (Google/Facebook).
 * @param location - The location of the user.
 * @returns - The result of the Supabase updateUser call.
 */
export const signUpWithSocial = async (location: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // get full name that was added automatcally from conset popup (google/facebook)
  const {
    user_metadata: { full_name },
  } = user ?? { user_metadata: { full_name: "" } };

  const [firstname, lastname] = (full_name as string).split(" ");

  return await supabase.auth.updateUser({
    data: {
      location,
      firstname,
      lastname,
    },
  });
};
