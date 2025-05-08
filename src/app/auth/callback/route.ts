import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const {
      error,
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // determine if the user is signing up or login in by checking if the user has a firstname
      const isLogin = !!user?.user_metadata?.firstname;
      const provider = user?.app_metadata?.provider;

      // if the user is signing up, redirect to the signup page to complete the process
      // TODO handle login properly
      const redirectPath = isLogin ? "/" : `/signup/${provider}`;

      return NextResponse.redirect(`${origin}${redirectPath}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
