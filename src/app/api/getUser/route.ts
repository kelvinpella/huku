import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new NextResponse("Id ya mtuamiaji inahitajika", { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (data) {
    const { user } = data;
    const dataToReturn = {
      firstName: user?.user_metadata.firstname || "Akaunti imefutwa",
      contact_details: user?.user_metadata.contact_details || {},
      location: user?.user_metadata.location || "Eneo limefutwa ",
    };

    return NextResponse.json(dataToReturn);
  }
  return new NextResponse(error?.message || "Kuna tatizo limetokea", {
    status: 500,
  });
}
