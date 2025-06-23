import { ApplicationStatus } from "@/typings";
import { useOptimistic } from "react";

/**
 * A custom hook that provides an optimistic state update mechanism for the `ApplicationStatus`.
 *
 * This hook leverages React's `useOptimistic` to allow for immediate UI updates
 * when changing the application status, before the actual update is confirmed.
 *
 * @param applicationStatus - The current status of the application.
 * @returns A tuple containing the optimistic application status and a function to update it.
 */

export const useOptimisticApplicationStatus = (
  applicationStatus: ApplicationStatus | null
) => {
  return useOptimistic(
    applicationStatus,
    (_, newStatus: ApplicationStatus) => newStatus
  );
};
