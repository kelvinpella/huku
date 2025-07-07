import React from "react";
import JobApplicant from "./JobApplicant";
import CustomButton from "@/components/Buttons/CustomButton";

type Props = {
  applicants: string[];
  numberOfApplicantsToShow: number;
  loadMore: () => void;
};
export default function JobApplicantsList({
  applicants,
  numberOfApplicantsToShow,
  loadMore,
}: Props) {
  const jobApplicants = applicants
    .slice(0, numberOfApplicantsToShow)
    .map((applicant) => <JobApplicant key={applicant} userId={applicant} />);

  const shouldShowLoadMoreButton = applicants.length > numberOfApplicantsToShow;

  return (
    <div className="w-full md:max-w-lg">
      <div className="w-full py-4 my-4 flex flex-col gap-4 divide-y divide-gray-300">
        {jobApplicants}
      </div>
      {shouldShowLoadMoreButton && (
        <CustomButton
          variant="outline"
          onClick={loadMore}
          value={"Onyesha waombaji zaidi"}
          className="w-max mx-auto my-6 whitespace-nowrap"
        />
      )}
    </div>
  );
}
