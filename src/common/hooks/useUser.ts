
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
 * Custom React hook to retrieve the authenticated user from Supabase using SWR for data fetching and caching.
 *
 * @returns An object containing the authenticated user (`user`) and additional SWR response properties such as `error`, `isLoading`, etc.
 *
 * @example
 * const { user, error, isLoading } = useUser();
 */
export const useUser = () => {
  const { data: user, ...rest } = useSwr("user", fetchUser);

  return { user, ...rest };
};
