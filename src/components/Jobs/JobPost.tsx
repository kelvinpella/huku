import { DownloadableImage, Job } from "@/typings";
import JobPostContent from "./JobPostContent";
import { JobPostContext } from "@/common/context/JobPostContext";
import { useState } from "react";

type Props = {
  job: Job;
};

export default function JobPost({ job }: Props) {

    const [imagesToDeleteFromSupabase, setImagesToDeleteFromSupabase] = useState<
      DownloadableImage[]
    >([]);
  return (
    <JobPostContext
      value={{
        job,imagesToDeleteFromSupabase, setImagesToDeleteFromSupabase
      }}
    >
      <JobPostContent />
    </JobPostContext>
  );
}
