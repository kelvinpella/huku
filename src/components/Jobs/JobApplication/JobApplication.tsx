import { JobPostContext } from "@/common/context/JobPostContext";
import { use, useCallback, useState } from "react"; 
import { useOptimisticApplicationStatus } from "@/common/hooks/useOptimisticApplicationStatus";
import JobApplicationStatus from "./JobApplicationStatus";
import UserContactDetails from "./UserContactDetails";

export default function JobApplication() {
  const { job } = use(JobPostContext);

  const {
    optimisticApplicationStatus,
    setOptimisticApplicationStatus,
    setApplicationStatus,
  } = useOptimisticApplicationStatus(job);

  const [openModal, setOpenModal] = useState(false);

  const toggleContactFormHandler = useCallback(() => {
    setOpenModal((prevState) => !prevState);
  }, []);

  return (
    <>
      <JobApplicationStatus
        applicationStatus={optimisticApplicationStatus}
        toggleContactFormHandler={toggleContactFormHandler}
      />
      <UserContactDetails
        openModal={openModal} 
        setApplicationStatus={setApplicationStatus}
        toggleContactFormHandler={toggleContactFormHandler}
        setOptimisticApplicationStatus={setOptimisticApplicationStatus}
      />
    </>
  );
}
