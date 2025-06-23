import { ApplicationStatus, ContactDetailsForm, Job } from "@/typings";
import { sendJobApplicationAction } from "../actions/sendJobApplicationAction";
import { Dispatch, SetStateAction, startTransition } from "react";
import { revalidateSwrPartialKeys } from "./revalidateSwrPartialKeys";
import { updateUserContactDetailsAction } from "../actions/updateUserContactDetailsAction";
/**
 * Sends a job application for a given job and updates the user's contact details.
 *
 * This function performs the following steps:
 * 1. Updates the user's contact details using the provided form data.
 * 2. Revalidates SWR cache for user-related data.
 * 3. Sends a job application for the specified job ID.
 * 4. If the application is successful, updates the application status to "applied" and revalidates the jobs cache.
 *
 * @param contactDetails - The user's contact details to update.
 * @param jobId - The ID of the job to apply for.
 * @param setApplicationStatus - A React state setter to update the application status.
 * @throws Will throw an error if sending the job application fails.
 */

export async function sendJobApplication(
  contactDetails: ContactDetailsForm,
  jobId: Job["id"],
  setApplicationStatus: Dispatch<SetStateAction<ApplicationStatus | null>>
) {
    // update user contact details
  await updateUserContactDetailsAction(contactDetails);
  revalidateSwrPartialKeys(["user"], true);

  // send application
  const { data, error } = await sendJobApplicationAction(jobId);
  if (error) throw new Error(error.message);

  if (data) {
    startTransition(() => setApplicationStatus("applied"));
    revalidateSwrPartialKeys(["/api/getJobs"], true);
  }
}
