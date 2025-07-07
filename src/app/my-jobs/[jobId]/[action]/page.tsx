import JobApplicants from "@/components/Jobs/MyJobs/JobApplicants";
import { Job } from "@/typings";
import { notFound } from "next/navigation";

type PageParams = {
  params: Promise<{
    jobId: Job["id"];
    action: "applicants";
  }>;
};

const ALLOWED_ACTIONS = ["applicants"] as const;

export default async function MyJobsWithParamsPage({ params }: PageParams) {
  const { action } = await params;

  if (!ALLOWED_ACTIONS.includes(action)) {
    notFound();
  }
  return (
    <div className="w-full">
      <JobApplicants />
    </div>
  );
}
