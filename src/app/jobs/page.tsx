import JobLoadingSkeleton from "@/components/CustomLoaders/JobLoadingSkeleton";
import Jobs from "@/components/Jobs/Jobs";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

export default async function JobsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const jobsPromise = supabase
    .from("jobs")
    .select()
    .neq("created_by", user?.id)
    .order("created_at", { ascending: false });

  const fallback = (
    <div className="w-full flex flex-col gap-4">
      {Array(10)
        .fill(Boolean)
        .map((_, index) => (
          <JobLoadingSkeleton key={index} />
        ))}
    </div>
  );

  return (
    <div className="w-full px-2 py-6 my-12">
      <Suspense fallback={fallback}>
        <Jobs jobsPromise={jobsPromise} /> 
      </Suspense>
    </div>
  );
}
