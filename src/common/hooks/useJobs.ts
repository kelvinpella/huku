import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { fetchJobs } from "../functions/fetchJobs";
import { usePathname } from "next/navigation";

const getKey = (
  isMyJobsPage: boolean,
  ...[pageIndex, previousPageData]: Parameters<SWRInfiniteKeyLoader>
) => {
  if (previousPageData && !previousPageData.length) return null;

  return `/api/getJobs?page=${pageIndex}&filterByCurrentUser=${isMyJobsPage}`;
};

export const useJobs = () => {
  const pathname = usePathname();

  const isMyJobsPage = pathname === "/my-jobs";

  const { data: jobs, ...rest } = useSWRInfinite(
    (...swrArgs) => getKey(isMyJobsPage, ...swrArgs),
    fetchJobs,
    {
      shouldRetryOnError: false,
    }
  );

  return { jobs, ...rest };
};
