"use client";

import { useCallback, useMemo } from "react";
import LoadingFeedback from "../CustomLoaders/LoadingFeedback";
import { useJobs } from "@/common/hooks/useJobs";
import JobsLoadingSkeleton from "../CustomLoaders/JobsLoadingSkeleton";
import dynamic from "next/dynamic";
type Props = {
  pageTitle: string;
};

const DynamicComponentWithNoSSR = dynamic(() => import("./JobPosts"), {
  ssr: false,
});

export default function Jobs({ pageTitle }: Props) {
  const { jobs, isLoading, error, setSize, isValidating } = useJobs();

  const loadMore = useCallback(async () => {
    setSize((prevSize) => prevSize + 1);
  }, [setSize]);

  const allJobs = useMemo(() => {
    if (jobs && jobs.flat().length) {
      return (
        <DynamicComponentWithNoSSR
          jobs={jobs}
          loadMore={loadMore}
          isValidating={isValidating}
        />
      );
    }

    const loading = isLoading && <JobsLoadingSkeleton />;
    const message = jobs ? "Hakuna kazi zilizotangazwa" : "";
    const errorMessage = error ? "Kuna tatizo limetokea. Jaribu tena" : "";
    return (
      <LoadingFeedback
        loading={loading}
        message={message}
        errorMessage={errorMessage}
      />
    );
  }, [jobs, error, loadMore, isValidating, isLoading]);

  return (
    <>
      <h2>{pageTitle}</h2>
      {allJobs}
    </>
  );
}
