import { ApplicationStatus, ContactDetailsForm, Job } from "@/typings";
import { sendJobApplicationAction } from "../actions/sendJobApplicationAction";
import { mutate } from "swr"; 
import { Dispatch, SetStateAction, startTransition } from "react";

/**
 * Sends a job application using the provided contact details and job ID.
 * 
 * This function calls the `sendJobApplicationAction` to submit the application,
 * handles any errors, updates the application status to "applied" using the provided setter,
 * and triggers a revalidation of the "user" SWR cache key.
 * 
 * @param contactDetails - The contact details form data to be submitted with the application.
 * @param jobId - The unique identifier of the job to apply for.
 * @param setApplicationStatus - React state setter to update the application status.
 * @throws Will throw an error if the application submission fails.
 */

export async function sendJobApplication(
  contactDetails: ContactDetailsForm,
  jobId: Job["id"],
  setApplicationStatus: Dispatch<SetStateAction<ApplicationStatus | null>>
) {
  const { data, error } = await sendJobApplicationAction(contactDetails, jobId);
  if (error) throw new Error(error.message);

  if (data) {
    // TODO handle persistance of 'applied'.
    // observe mutate() interference
    startTransition(() => setApplicationStatus("applied")); 
     mutate("user");
  }
}
