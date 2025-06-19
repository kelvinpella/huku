import { Job } from "@/typings";
import { useOptimistic } from "react";

/**
 * Custom React hook that provides optimistic UI updates for job applications.
 *
 * This hook allows the UI to immediately reflect that the current user has applied for a job,
 * even before the server confirms the application. It uses React's `useOptimistic` to update
 * the list of applicants optimistically by adding the new applicant to the job's applicants array.
 *
 * @param job - The job object to apply optimistic updates to.
 * @returns A tuple containing the optimistic job state and a function to trigger the optimistic update.
 */
export const useOptimisticJob = (job: Job) => {
  return useOptimistic(job, (currentJob, newApplicant: string) => ({
    ...currentJob,
    applicants: [...new Set([...(currentJob.applicants ?? []), newApplicant])],
  }));
};
