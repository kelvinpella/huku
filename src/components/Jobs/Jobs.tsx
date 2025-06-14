"use client";

import { use, useMemo } from "react";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { Job } from "@/typings";
import { GenericSchema } from "@supabase/supabase-js/dist/module/lib/types";
import JobPosts from "./JobPosts";
import ErrorMessage from "../Containers/ErrorMessage";

type Props = {
  jobsPromise: PostgrestFilterBuilder<
    GenericSchema,
    Record<string, unknown>,
    Job[]
  >;
};

export default function Jobs({ jobsPromise }: Props) {
  const { data, error } = use(jobsPromise);

  const jobs = useMemo(() => {
    if (data && data.length) {
      return <JobPosts jobs={data} />;
    }
    const message = data ? "No jobs found" : "";
    const errorMessage = error ? error.message : "";

    return <ErrorMessage message={message} errorMessage={errorMessage} />;
  }, [data, error]);

  return <div>
    <h1 className="text-2xl font-bold mb-4">Jobs</h1>
    {jobs}
  </div>;
}
