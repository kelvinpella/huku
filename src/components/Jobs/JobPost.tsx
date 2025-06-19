import { ContactDetailsForm, Job } from "@/typings";
import JobPostContent from "./JobPostContent";
import { useCallback, useState, useTransition } from "react";
import Modal from "../Modal/Modal";
import UserContactDetailsForm from "../Forms/UserContactDetailsForm/UserContactDetailsForm";
import { useUser } from "@/common/hooks/useUser";
import { useOptimisticJob } from "@/common/hooks/useOptimisticJob";
import { sendJobApplicationAction } from "@/common/actions/sendJobApplicationAction";
import { toastNofication } from "@/common/functions/toastNotification";

type Props = {
  job: Job;
};

export default function JobPost({ job }: Props) {
  const { user, mutate } = useUser();
  const [optimisticJob, addOptimisticApplicant] = useOptimisticJob(job);
  const [, startTransition] = useTransition();
  const [openModal, setOpenModal] = useState(false);

  const toggleContactFormHandler = useCallback(() => {
    setOpenModal((prevState) => !prevState);
  }, []);

  const applyJobHandler = useCallback(
    async (values: ContactDetailsForm) => {
      toggleContactFormHandler();

      if (user) startTransition(() => addOptimisticApplicant(user.id));

      // send application by updating the list of applicants
      const { data } = await sendJobApplicationAction(values, optimisticJob.id);

      if (data) {
        toastNofication("Maombi yametumwa kikamilifu", {
          type: "success",
        });
        mutate();
      } else {
        toastNofication("Maombi yameshindikana. Jaribu tena", {
          type: "error",
        });
      }
    },
    [
      addOptimisticApplicant,
      user,
      toggleContactFormHandler,
      mutate,
      optimisticJob,
    ]
  );

  return (
    <>
      <JobPostContent
        job={optimisticJob}
        toggleContactFormHandler={toggleContactFormHandler}
      />
      <Modal
        open={openModal}
        onClose={toggleContactFormHandler}
        title="Maombi ya kazi"
        description={`Jina la kazi: ${optimisticJob.title}`}
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
