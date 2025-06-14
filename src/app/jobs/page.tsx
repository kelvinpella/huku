import Jobs from "@/components/Jobs/Jobs";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

export default async function JobsPage() {
  const supabase = await createClient();
  const jobsPromise = supabase.from("jobs").select();

  //TODO HANDLE FALLBACKS
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <Jobs jobsPromise={jobsPromise} />
    </Suspense>
  );
}
