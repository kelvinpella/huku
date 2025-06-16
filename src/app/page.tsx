import LandingPage from "@/components/LandingPage/LandingPage";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/jobs");
  }

  return <LandingPage />;
}
