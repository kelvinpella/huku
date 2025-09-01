import React, {
  Dispatch,
  SetStateAction,
  use,
  useCallback, 
  useTransition,
} from "react";
import { useUser } from "@/common/hooks/useUser";
import {
  ApplicationStatus,
  ContactDetailsForm, 
} from "@/typings"; 
import { toastNotification } from "@/common/functions/toastNotification";
import { sendJobApplication } from "@/common/functions/sendJobApplication";
import { JobPostContext } from "@/common/context/JobPostContext";
import { updateUserContactDetails } from "@/common/functions/updateUserContactDetails";
import { revalidateSwrPartialKeys } from "@/common/functions/revalidateSwrPartialKeys";
import Modal from "@/components/Modal/Modal";
import UserContactDetailsForm from "@/components/Forms/UserContactDetailsForm/UserContactDetailsForm";

type Props = {
  toggleContactFormHandler: () => void;
  setOptimisticApplicationStatus: (status: ApplicationStatus) => void;
  setApplicationStatus: Dispatch<SetStateAction<ApplicationStatus | null>>;
  openModal: boolean;
};
export default function UserContactDetails({
  toggleContactFormHandler,
  setApplicationStatus,
  openModal,
  setOptimisticApplicationStatus,
}: Props) {
  const { job, setImagesToDeleteFromSupabase, imagesToDeleteFromSupabase } =
    use(JobPostContext);

  const { user } = useUser();

  const [, startTransition] = useTransition();

  const applyJobHandler = useCallback(
    async (values: ContactDetailsForm) => {
      toggleContactFormHandler();

      if (user) {
        startTransition(() => setOptimisticApplicationStatus("pending"));

        // send job application
        await toastNotification({
          toastType: "promise",
          args: [
            sendJobApplication(job.id, setApplicationStatus),
            {
              pending: "Submitting application...",
              success: "Application submitted successfully",
              error: "Application failed. Please try again",
            },
          ],
        });

        // update user data
        await updateUserContactDetails(values, imagesToDeleteFromSupabase);
        revalidateSwrPartialKeys(["user"]);

        // clear images from context
        startTransition(() => setImagesToDeleteFromSupabase([]));
      }
    },
    [
      user,
      imagesToDeleteFromSupabase,
      job.id,
      setImagesToDeleteFromSupabase,
      setOptimisticApplicationStatus,
      toggleContactFormHandler,
      setApplicationStatus,
    ]
  );

  return (
    <Modal
      open={openModal}
      onClose={toggleContactFormHandler}
      title="Job Application"
      description={`Job title: ${job.title}`}
      cancelButtonAttributes={{
        value: "Cancel",
        onClick: toggleContactFormHandler,
      }}
      submitButtonAttributes={{
        value: "Submit",
        type: "submit",
        form: "contact-details-form",
      }}
    >
      <UserContactDetailsForm applyJobHandler={applyJobHandler} />
    </Modal>
  );
}
