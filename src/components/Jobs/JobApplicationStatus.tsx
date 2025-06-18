import { useUser } from "@/common/hooks/useUser";
import { FaCircleCheck } from "react-icons/fa6";
import CustomButton from "../Buttons/CustomButton";
import { ComponentProps } from "react";
import JobPostContent from "./JobPostContent";

type Props = ComponentProps<typeof JobPostContent>;

export default function JobApplicationStatus({ job, applyJobHandler }: Props) {
  const { data, isLoading } = useUser();
  const { applicants } = job;

  const isApplicant = !!applicants?.some((applicant) => applicant === data?.id);

  const applicationStatus = isApplicant ? (
    <div className="flex items-center gap-1 flex-nowrap">
      <span>
        <FaCircleCheck className="text-green-500" />
      </span>
      <span className="text-sm">Umeshaomba</span>
    </div>
  ) : (
    <CustomButton value="Omba" onClick={applyJobHandler} />
  );

  if (isLoading) return null;

  return applicationStatus;
}
