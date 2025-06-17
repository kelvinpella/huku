import { useUser } from "@/common/hooks/useUser";
import { Job } from "@/typings";
import { FaCircleCheck } from "react-icons/fa6";
import CustomButton from "../Buttons/CustomButton";

type Props = {
  job: Job;
};
export default function JobApplicationStatus({ job }: Props) {
  const { data, isLoading } = useUser();
  const { applicants } = job;

  const applyJobHandler = () => {
    // TODO handle job application logic
    console.log("Applying for job:", job.id);
  };

  const isApplicant = !!applicants?.some((applicant) => applicant === data?.id);

  const applicationStatus = isApplicant ? (
    <div className="flex items-center gap-1 flex-nowrap">
      <span>
        <FaCircleCheck className="text-green-500" />
      </span>
      <span className="text-sm">Umeshaomba</span>
    </div>
  ) : (
    <CustomButton value="omba" onClick={applyJobHandler} />
  );

  if (isLoading) return null;

  return applicationStatus;
}
