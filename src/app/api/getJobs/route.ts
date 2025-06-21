import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const rows = 10;
  const pageNumber = Number(page);
  const from = pageNumber * rows;
  const to = from + (rows - 1);

  const { data, error } = await supabase
    .from("jobs")
    .select()
    .neq("created_by", user?.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (data) return NextResponse.json(data);

  return new NextResponse(error.message, { status: 500 });
}
