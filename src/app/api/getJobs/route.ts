import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const filterByCurrentUser = searchParams.get("filterByCurrentUser");

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const rows = 10;
  const pageNumber = Number(page);
  const from = pageNumber * rows;
  const to = from + (rows - 1);

  let query = supabase
    .from("jobs")
    .select()
    .order("created_at", { ascending: false })
    .range(from, to);

  // filterByCurrentUser is a string, so check for 'true'
  if (filterByCurrentUser === "true") {
    query = query.eq("created_by", user?.id);
  } else {
    query = query.neq("created_by", user?.id);
  }

  const { data, error } = await query;

  if (data) return NextResponse.json(data);

  return new NextResponse(error.message, { status: 500 });
}
