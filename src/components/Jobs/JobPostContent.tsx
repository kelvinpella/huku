import { Job } from "@/typings";
import { formatDistanceToNow } from "date-fns";
import JobPostDescription from "./JobPostDescription";
import JobApplicationStatus from "./JobApplicationStatus";

type Props = {
  job: Job;
  applyJobHandler: () => void;
};
export default function JobPostContent({ job, applyJobHandler }: Props) {
  const { title, created_at, description, budget, skills } = job;

  const formattedDate = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });

  const formattedBudget = new Intl.NumberFormat("sw-TZ", {
    style: "currency",
    currency: "TZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(budget);

  const skillsList = skills.join(", ");
  return (
    <div className="group w-full px-2 py-2 rounded hover:bg-spindle">
      <h3 className="group-hover:text-spanish-violet group-hover:underline">
        {title}
      </h3>
      <p className="text-sm">{formattedDate}</p>
      <JobPostDescription description={description} />
      <div className="my-2">
        <span>Ujuzi unaotakiwa: </span>
        <span className="font-semibold text-sm">{skillsList}</span>
      </div>
      <div className="w-full flex items-end justify-between gap-2 py-2 my-3">
        <div className="w-full flex items-center gap-2 ">
          <span className="">Bajeti:</span>
          <span className="text-sm font-semibold">{formattedBudget}</span>
        </div>
        <JobApplicationStatus job={job} applyJobHandler={applyJobHandler} />
      </div>
    </div>
  );
}
