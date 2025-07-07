import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { fetchJobs } from "../functions/fetchJobs";
import { usePathname } from "next/navigation";
import { Job } from "@/typings";
/**
 * Custom React hook for fetching paginated job data using SWR Infinite.
 *
 * This hook determines if the current page is the "My Jobs" page and fetches jobs accordingly.
 * It supports pagination and optional filtering by a specific job ID.
 *
 * @param jobId - (Optional) The ID of a specific job to filter results by.
 * @returns An object containing the paginated jobs data and SWR Infinite response properties.
 *
 * @example
 * const { jobs, isLoading, size, setSize } = useJobs();
 *
 * @remarks
 * - Uses SWR Infinite for pagination.
 * - Disables retry on error.
 * - The hook automatically detects if the current route is "/my-jobs" to filter jobs by the current user.
 */

const getKey = (
  isMyJobsPage: boolean,
  jobId: Job["id"] | undefined,
  ...[pageIndex, previousPageData]: Parameters<SWRInfiniteKeyLoader>
) => {
  if (previousPageData && !previousPageData.length) return null;

  return `/api/getJobs?page=${pageIndex}&filterByCurrentUser=${isMyJobsPage}&jobId=${
    jobId ?? ""
  }`;
};

export const useJobs = (jobId?: Job["id"], shouldFetchJobs: boolean = true) => {
  const pathname = usePathname();

  const isMyJobsPage = pathname === "/my-jobs";

  const { data: jobs, ...rest } = useSWRInfinite(
    (...swrArgs) =>
      shouldFetchJobs ? getKey(isMyJobsPage, jobId, ...swrArgs) : null,
    fetchJobs,
    {
      shouldRetryOnError: false,
    }
  );

  return { jobs, ...rest };
};
