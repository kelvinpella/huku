import { ApplicationStatus, ContactDetailsForm, Job } from "@/typings";
import JobPostContent from "./JobPostContent";
import { useCallback, useEffect, useState, useTransition } from "react";
import Modal from "../Modal/Modal";
import UserContactDetailsForm from "../Forms/UserContactDetailsForm/UserContactDetailsForm";
import { useUser } from "@/common/hooks/useUser";
import { toastNofication } from "@/common/functions/toastNotification";
import { sendJobApplication } from "@/common/functions/sendJobApplication";
import { useOptimisticApplicationStatus } from "@/common/hooks/useOptimisticApplicationStatus";

type Props = {
  job: Job;
};

export default function JobPost({ job }: Props) {
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatus | null>(null);

  const [optimisticApplicationStatus, setOptimisticApplicationStatus] =
    useOptimisticApplicationStatus(applicationStatus);

  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [, startTransition] = useTransition();

  const toggleContactFormHandler = useCallback(() => {
    setOpenModal((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (user) {
      const applicants = job.applicants ?? [];
      const hasApplied = applicants.some((applicant) => applicant === user.id);
      setApplicationStatus(() => (hasApplied ? "applied" : "not_applied"));
    }
  }, [job, user]);

  const applyJobHandler = useCallback(
    async (values: ContactDetailsForm) => {
      toggleContactFormHandler();

      if (user) {
        startTransition(() => {
          setOptimisticApplicationStatus("pending");

          // send job application
          toastNofication({
            toastType: "promise",
            args: [
              sendJobApplication(values, job.id, setApplicationStatus),
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
    <>
      <JobPostContent
        job={job}
        toggleContactFormHandler={toggleContactFormHandler}
        applicationStatus={optimisticApplicationStatus}
      />
      <Modal
        open={openModal}
        onClose={toggleContactFormHandler}
        title="Maombi ya kazi"
        description={`Jina la kazi: ${job.title}`}
      >
        <UserContactDetailsForm
          toggleContactFormHandler={toggleContactFormHandler}
          applyJobHandler={applyJobHandler}
          contactDetails={user?.user_metadata?.contact_details}
        />
      </Modal>
    </>
  );
}
