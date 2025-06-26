import CustomButton from "../Buttons/CustomButton";
import { ApplicationStatus } from "@/typings";
import JobApplicationStatusElement from "./JobApplicationStatusElement";
import { FaCircleCheck } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";
import { JobPostContext } from "@/common/context/JobPostContext";
import { JSX, use, useMemo } from "react";

export default function JobApplicationStatus() {
  const { applicationStatus, toggleContactFormHandler } = use(JobPostContext);
  const status = useMemo(() => {
    const applicationStatusToRender: Record<ApplicationStatus, JSX.Element> = {
      applied: (
        <JobApplicationStatusElement statusText="umeshaomba">
          <FaCircleCheck className="text-green-500" />
        </JobApplicationStatusElement>
      ),
      pending: (
        <JobApplicationStatusElement statusText="inatuma">
          <FaExclamationCircle className="text-orange-500" />
        </JobApplicationStatusElement>
      ),
      not_applied: (
        <CustomButton value="Omba" onClick={toggleContactFormHandler} />
      ),
    };

    return applicationStatus
      ? applicationStatusToRender[applicationStatus]
      : null;
  }, [applicationStatus, toggleContactFormHandler]);

  return status;
}
