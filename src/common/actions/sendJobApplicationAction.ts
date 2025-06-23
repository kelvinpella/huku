"use server";

import { ContactDetailsForm, Job } from "@/typings";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

/**
 * Sends a job application by updating the user's contact details and adding the user as an applicant to the specified job.
 *
 * This function performs the following actions:
 * 1. Retrieves the currently authenticated user from Supabase.
 * 2. Updates the user's profile metadata with the provided contact details (e.g., WhatsApp, Instagram).
 * 3. Calls a Supabase RPC function to add the user to the applicants list for the specified job.
 *
 * @param values - The contact details form data to update in the user's profile.
 * @param jobId - The unique identifier of the job to which the user is applying.
 * @returns A promise that resolves with the result of the Supabase RPC call to update job applicants.
 */

export const sendJobApplicationAction = async (
  values: ContactDetailsForm,
  jobId: Job["id"]
): Promise<PostgrestSingleResponse<Job["applicants"]>> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Update the user's profile metadata with their WhatsApp and instagram
  await supabase.auth.updateUser({
    data: {
      contact_details: { ...values },
    },
  });

  // update applicants list for this job
  return await supabase.rpc("update_job_applicants", {
    job_id: jobId,
    new_applicant: user?.id,
  });
};
