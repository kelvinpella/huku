import { ApplicationStatus } from "@/typings";
import { JSX, useMemo } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import JobApplicationStatusElement from "./JobApplicationStatusElement";
import CustomButton from "@/components/Buttons/CustomButton";

type Props = {
  applicationStatus?: ApplicationStatus | null;
  toggleContactFormHandler: () => void;
};
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
