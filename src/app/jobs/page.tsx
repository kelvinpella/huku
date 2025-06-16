import JobLoadingSkeleton from "@/components/CustomLoaders/JobLoadingSkeleton";
import Jobs from "@/components/Jobs/Jobs";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

export default async function JobsPage() {
  const supabase = await createClient();
  const jobsPromise = supabase.from("jobs").select();

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
