"use server";

import { Job } from "@/typings";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

/**
 * Sends a job application for the currently authenticated user to the specified job.
 *
 * This function retrieves the current user from Supabase authentication,
 * then calls the `update_job_applicants` remote procedure on the Supabase backend
 * to add the user's ID to the applicants list for the given job.
 *
 * @param jobId - The unique identifier of the job to apply for.
 * @returns A promise that resolves to the result of the Supabase RPC call,
 *          containing the updated list of applicants for the job.
 */

export const sendJobApplicationAction = async (
  jobId: Job["id"]
): Promise<PostgrestSingleResponse<Job["applicants"]>> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // update applicants list for this job
  return await supabase.rpc("update_job_applicants", {
    job_id: jobId,
    new_applicant: user?.id,
  });
};
