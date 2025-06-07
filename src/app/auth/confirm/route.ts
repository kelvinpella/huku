import { createClient } from "@/utils/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  // redirect to 404 if token_hash or type is not present
  if (!token_hash || !type) {
    redirect("/404");
  }

  // verify the token_hash and type
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type,
  });

  if (error) {
    // redirect to the error page
    redirect("/email-verification/error");
  } else {
    // redirect to the success page
    redirect("/email-verification/success");
  }
}
