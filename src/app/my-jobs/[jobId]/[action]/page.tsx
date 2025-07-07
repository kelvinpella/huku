import EditJob from "@/components/Jobs/MyJobs/EditJob";
import JobApplicants from "@/components/Jobs/MyJobs/JobApplicants";
import { Job } from "@/typings";
import { notFound } from "next/navigation";

type PageParams = {
  params: Promise<{
    jobId: Job["id"];
    action: "edit" | "applicants";
  }>;
};

const ALLOWED_ACTIONS = ["edit", "applicants"] as const;

export default async function MyJobsWithParamsPage({ params }: PageParams) {
  const { action } = await params;

  if (!ALLOWED_ACTIONS.includes(action)) {
    notFound();
  }

  let renderContent;

  if (action === "edit") {
    renderContent = <EditJob />;
  } else if (action === "applicants") {
    renderContent = <JobApplicants />;
  }
  return <div className="w-full">{renderContent}</div>;
}
