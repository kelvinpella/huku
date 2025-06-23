import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates and returns a Supabase browser client instance using environment variables.
 *
 * @remarks
 * This function utilizes the `createBrowserClient` method from `@supabase/ssr`
 * to initialize a Supabase client with the public URL and anonymous key
 * provided via environment variables.
 *
 * @returns A Supabase browser client instance.
 *
 * @throws Will throw an error if the required environment variables are not defined.
 */

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
