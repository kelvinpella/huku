import { ApplicationStatus, Job } from "@/typings";
import { sendJobApplicationAction } from "../actions/sendJobApplicationAction";
import { Dispatch, SetStateAction, startTransition } from "react";
import { revalidateSwrPartialKeys } from "./revalidateSwrPartialKeys";

export async function sendJobApplication(
  jobId: Job["id"],
  setApplicationStatus: Dispatch<SetStateAction<ApplicationStatus | null>>
) {
  // send application
  const { data, error } = await sendJobApplicationAction(jobId);
  if (error) throw new Error(error.message);

  if (data) {
    startTransition(() => {
      setApplicationStatus("applied");
    });
    revalidateSwrPartialKeys(["/api/getJobs"]);
  }
}
