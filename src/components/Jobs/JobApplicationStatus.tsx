
import CustomButton from "../Buttons/CustomButton";
import { ComponentProps, JSX, useMemo } from "react";
import JobPostContent from "./JobPostContent";
import { ApplicationStatus } from "@/typings";
import JobApplicationStatusElement from "./JobApplicationStatusElement";
import { FaCircleCheck } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";

type Props = Pick<
  ComponentProps<typeof JobPostContent>,
  "applicationStatus" | "toggleContactFormHandler"
>;

export default function JobApplicationStatus({
  applicationStatus,
  toggleContactFormHandler,
}: Props) {
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
