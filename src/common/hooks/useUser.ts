import { createClient } from "@/utils/supabase/client";
import useSwr from "swr";

const fetchUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
/**
 * Gets the authenticated user from Supabase.
 * @returns The authenticated user from Supabase.
 */
export const useUser = () => {
  const { data: user, ...rest } = useSwr("user", fetchUser);

  return { user, ...rest };
};
