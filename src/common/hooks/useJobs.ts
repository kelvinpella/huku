import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { fetchJobs } from "../functions/fetchJobs";

const getKey = (
  ...[pageIndex, previousPageData]: Parameters<SWRInfiniteKeyLoader>
) => {
  if (previousPageData && !previousPageData.length) return null;
  return `/api/getJobs?page=${pageIndex}`;
};

/**
 * Custom React hook to fetch paginated job data using SWR Infinite.
 *
 * Utilizes the `useSWRInfinite` hook to handle infinite scrolling or pagination
 * for job listings. The hook manages fetching, caching, and updating job data
 * from the `/api/getJobs` endpoint, using the provided `fetchJobs` function.
 *
 * @returns An object containing:
 * - `jobs`: The array of job data for all loaded pages.
 * - Other properties and methods returned by `useSWRInfinite` (e.g., `size`, `setSize`, `isValidating`, etc.).
 *
 * @example
 * ```tsx
 * const { jobs, isValidating, setSize } = useJobs();
 * ```
 */

export const useJobs = () => {
  const { data: jobs, ...rest } = useSWRInfinite(getKey, fetchJobs, {
    shouldRetryOnError: false,
  });

  return { jobs, ...rest };
};
