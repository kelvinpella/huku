import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/posts");
  }
  return <> {children} </>;
}
