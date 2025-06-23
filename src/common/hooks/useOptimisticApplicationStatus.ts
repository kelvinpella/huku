import { ApplicationStatus, Job } from "@/typings";
import { useEffect, useOptimistic, useState } from "react";
import { useUser } from "./useUser";

/**
 * A custom React hook that manages the optimistic application status for a given job.
 *
 * This hook determines whether the current user has applied to the specified job and
 * provides an optimistic state update mechanism for the application status.
 *
 * @param job - The job object for which to track the application status.
 * @returns An object containing:
 *   - `optimisticApplicationStatus`: The current (possibly optimistic) application status.
 *   - `setOptimisticApplicationStatus`: Function to optimistically update the application status.
 *   - `setApplicationStatus`: Function to set the actual application status.
 *
 * @remarks
 * - Uses the `useUser` hook to get the current user.
 * - On mount or when the user/job changes, sets the application status to "applied"
 *   if the user is found in the job's applicants list, or "not_applied" otherwise.
 * - Supports optimistic UI updates for application status changes.
 */

export const useOptimisticApplicationStatus = (job: Job) => {
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatus | null>(null);

  const [optimisticApplicationStatus, setOptimisticApplicationStatus] =
    useOptimistic(
      applicationStatus,
      (_, newStatus: ApplicationStatus) => newStatus
    );

  const { user } = useUser();

  /**
   * When the user or job changes, and there is no optimistic status set,
   * this effect checks if the current user has applied to the job.
   * It then sets the application status to "applied" if the user is found
   * in the job's applicants list, or "not_applied" otherwise.
   */
  useEffect(() => {
    if (user && !optimisticApplicationStatus) {
      const applicants = job.applicants ?? [];
      const hasApplied = applicants.some((applicant) => applicant === user.id);
      setApplicationStatus(() => (hasApplied ? "applied" : "not_applied"));
    }
  }, [job, user, optimisticApplicationStatus]);

  return {
    optimisticApplicationStatus,
    setOptimisticApplicationStatus,
    setApplicationStatus,
  };
};
