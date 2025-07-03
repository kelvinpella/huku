"use server";
import { createClient } from "@/utils/supabase/server";
import { SignOut } from "@supabase/supabase-js"; 

export async function logoutUserAction(scope: SignOut['scope'] = "local") {
  const supabase = await createClient();

 return await supabase.auth.signOut({ scope });

  
}
