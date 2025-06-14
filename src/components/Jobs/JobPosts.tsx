import { Job } from "@/typings";
import { useMemo } from "react";
import JobPost from "./JobPost";

type Props = {
  jobs: Job[];
};
export default function JobPosts({ jobs }: Props) {
  const posts = useMemo(() => {
    return jobs.map((job) => <JobPost key={job.id} job={job} />);
  }, [jobs]);
  return <div>{posts}</div>;
}
