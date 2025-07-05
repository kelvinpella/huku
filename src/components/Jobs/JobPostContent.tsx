import { formatDistanceToNow } from "date-fns";
import JobPostDescription from "./JobPostDescription";
import { use } from "react";
import { JobPostContext } from "@/common/context/JobPostContext";
import { usePathname } from "next/navigation";
import JobApplication from "./JobApplication";
import JobUpdateTools from "./JobUpdateTools";

export default function JobPostContent() {
  const { job } = use(JobPostContext);

  const pathname = usePathname();

  const isMyJobsPage = pathname === "/my-jobs";

  const { title, created_at, budget, skills } = job;

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

  const additionalContentBasedOnPage = isMyJobsPage ? (
    <JobUpdateTools/>
  ) : (
    <JobApplication />
  );

  return (
    <div className="group w-full px-2 py-2 rounded hover:bg-spindle">
      <h3 className="group-hover:text-spanish-violet group-hover:underline">
        {title}
      </h3>
      <p className="text-sm">{formattedDate}</p>
      <JobPostDescription />
      <div className="my-2">
        <span>Ujuzi unaotakiwa: </span>
        <span className="font-semibold text-sm">{skillsList}</span>
      </div>
      <div className="w-full flex items-center justify-between gap-2 ">
        <div className="w-full flex items-center gap-2 py-2 my-3">
          <span className="">Bajeti:</span>
          <span className="text-sm font-semibold">{formattedBudget}</span>
        </div>
        {additionalContentBasedOnPage}
      </div>
    </div>
  );
}
