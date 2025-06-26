import { ContactDetailsForm, Job } from "@/typings";
import JobPostContent from "./JobPostContent";
import { useCallback, useState, useTransition } from "react";
import Modal from "../Modal/Modal";
import UserContactDetailsForm from "../Forms/UserContactDetailsForm/UserContactDetailsForm";
import { useUser } from "@/common/hooks/useUser";
import { sendJobApplication } from "@/common/functions/sendJobApplication";
import { useOptimisticApplicationStatus } from "@/common/hooks/useOptimisticApplicationStatus";
import { toastNotification } from "@/common/functions/toastNotification";
import { JobPostContext } from "@/common/context/JobPostContext";

type Props = {
  job: Job;
};

export default function JobPost({ job }: Props) {
  const {
    optimisticApplicationStatus,
    setOptimisticApplicationStatus,
    setApplicationStatus,
  } = useOptimisticApplicationStatus(job);

  const { user } = useUser();

  const [openModal, setOpenModal] = useState(false);
  const [, startTransition] = useTransition();

  const toggleContactFormHandler = useCallback(() => {
    setOpenModal((prevState) => !prevState);
  }, []);

  const applyJobHandler = useCallback(
    async (values: ContactDetailsForm) => {
      toggleContactFormHandler();

      if (user) {
        startTransition(() => {
          setOptimisticApplicationStatus("pending");

          // send job application
          toastNotification({
            toastType: "promise",
            args: [
              sendJobApplication(values, job.id, setApplicationStatus, user.id),
              {
                pending: "Maombi yanatumwa...",
                success: "Maombi yametumwa kikamilifu",
                error: "Maombi yameshindikana. Jaribu tena",
              },
            ],
          });
        });
      }
    },
    [
      user,
      job.id,
      setOptimisticApplicationStatus,
      toggleContactFormHandler,
      setApplicationStatus,
    ]
  );

  return (
    <JobPostContext
      value={{
        job,
        toggleContactFormHandler,applyJobHandler,
        applicationStatus: optimisticApplicationStatus,
      }}
    >
      <JobPostContent />
      <Modal
        open={openModal}
        onClose={toggleContactFormHandler}
        title="Maombi ya kazi"
        description={`Jina la kazi: ${job.title}`}
      >
        <UserContactDetailsForm  
        />
      </Modal>
    </JobPostContext>
  );
}
