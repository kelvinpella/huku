"use client";

import { useJobs } from "@/common/hooks/useJobs";
import JobsLoadingSkeleton from "@/components/CustomLoaders/JobsLoadingSkeleton";
import LoadingFeedback from "@/components/CustomLoaders/LoadingFeedback";
import { Job } from "@/typings";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import JobApplicantsList from "./JobApplicantsList";
type ApplicantsStateType = Pick<Job, "applicants" | "title"> & {
  numberOfApplicantsToShow: number;
};
export default function JobApplicants() {
  const [applicantsState, setApplicantsState] = useState<ApplicantsStateType>({
    applicants: [],
    title: "",
    numberOfApplicantsToShow: 10,
  });

  const pathname = usePathname();

  const [, , jobId] = pathname.split("/");

  const { jobs, isLoading, error } = useJobs(jobId);

  const loadMore = () => {
    setApplicantsState((prevState) => ({
      ...prevState,
      numberOfApplicantsToShow: prevState.numberOfApplicantsToShow + 10,
    }));
  };

  const jobApplicants = useMemo(() => {
    const { applicants, numberOfApplicantsToShow } = applicantsState;

    if (applicants && applicants.length) {
      return (
        <JobApplicantsList
          applicants={applicants}
          loadMore={loadMore}
          numberOfApplicantsToShow={numberOfApplicantsToShow}
        />
      );
    }

    const loading = isLoading && <JobsLoadingSkeleton />;
    const message = error ? "" : "Hakuna waombaji wa kazi";
    const errorMessage = error ? "Kuna tatizo limetokea. Jaribu tena" : "";

    return (
      <LoadingFeedback
        loading={loading}
        message={message}
        errorMessage={errorMessage}
      />
    );
  }, [isLoading, error, applicantsState]);

  useEffect(() => {
    if (jobs && jobs.length) {
      const [{ applicants, title }] = jobs.flat();
      setApplicantsState((prevState) => ({ ...prevState, applicants, title }));
    }
  }, [jobs]);

  const { title } = applicantsState;
  return (
    <div className="w-full">
      <h2>Waombaji wa kazi</h2>
      <h3 className="text-gray-500">{title}</h3>
      <div className="w-full py-2 my-4">{jobApplicants}</div>
    </div>
  );
}
