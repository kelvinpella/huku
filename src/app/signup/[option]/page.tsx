import Signup from "@/components/Signup/Signup";
import { AuthPageParam, AuthOption } from "../../../typings";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// return 404 if the signup option is not listed as expected param
export const dynamicParams = false;

export function generateStaticParams() {
  const signupOptions: AuthOption[] = [
    "phone",
    "email",
    // "facebook",
    "google",
  ];

  return signupOptions.map((option) => ({ option }));
}

export default async function SignupPage({ params }: { params: AuthPageParam<'signup'> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  if (user) { 
   redirect("/jobs");
  }

  return <Signup signupOptionPromise={params} />;
}
