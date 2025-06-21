"use client";

import { useCallback, useMemo } from "react";
import JobPosts from "./JobPosts";
import LoadingFeedback from "../CustomLoaders/LoadingFeedback";
import { useJobs } from "@/common/hooks/useJobs";
import JobsLoadingSkeleton from "../CustomLoaders/JobsLoadingSkeleton";

export default function Jobs() {
  const { jobs, isLoading, error, setSize } = useJobs();

  const loadMore = useCallback(async() => {
    setSize((prevSize) => prevSize + 1);
  }, [setSize]);

  const allJobs = useMemo(() => {
    if (jobs && jobs.length) {
      return <JobPosts jobs={jobs} loadMore={loadMore} />;
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
  }, [jobs, error, loadMore, isLoading]);

  return (
    <>
      <h2>Kazi zilizotangazwa</h2>
      {allJobs}
    </>
  );
}
