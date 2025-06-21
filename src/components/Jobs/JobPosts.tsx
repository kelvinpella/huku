import { Job } from "@/typings";
import { useMemo } from "react";
import JobPost from "./JobPost";
import CustomButton from "../Buttons/CustomButton";

type Props = {
  jobs: Job[][];
  loadMore: () => void;
};
export default function JobPosts({ jobs, loadMore }: Props) {
  const posts = useMemo(() => {
    return jobs.flat().map((job) => <JobPost key={job.id} job={job} />);
  }, [jobs]);

  const shouldShowLoadMoreButton = jobs[jobs.length - 1].length === 5;

  return (
    <div className="w-full py-4 my-4 flex flex-col gap-4 divide-y divide-gray-300">
      {posts}
      {shouldShowLoadMoreButton && (
        <CustomButton
          variant="plane"
          onClick={loadMore}
          value={"Onyesha kazi zaidi"}
          className="w-max mx-auto my-6 whitespace-nowrap"
        />
      )}
    </div>
  );
}
