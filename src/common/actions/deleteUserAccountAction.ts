"use server";

import { createClient, User } from "@supabase/supabase-js";
export async function deleteUserAccountAction(userId: User["id"] | undefined) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );

  return await supabase.auth.admin.deleteUser(userId ?? "");
}
