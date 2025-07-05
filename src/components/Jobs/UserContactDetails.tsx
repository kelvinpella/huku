import React, {
  Dispatch,
  SetStateAction,
  use,
  useCallback, 
  useTransition,
} from "react";
import UserContactDetailsForm from "../Forms/UserContactDetailsForm/UserContactDetailsForm";
import { useUser } from "@/common/hooks/useUser";
import {
  ApplicationStatus,
  ContactDetailsForm, 
} from "@/typings";
import Modal from "../Modal/Modal";
import { toastNotification } from "@/common/functions/toastNotification";
import { sendJobApplication } from "@/common/functions/sendJobApplication";
import { JobPostContext } from "@/common/context/JobPostContext";
import { updateUserContactDetails } from "@/common/functions/updateUserContactDetails";
import { revalidateSwrPartialKeys } from "@/common/functions/revalidateSwrPartialKeys";

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
              pending: "Maombi yanatumwa...",
              success: "Maombi yametumwa kikamilifu",
              error: "Maombi yameshindikana. Jaribu tena",
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
      title="Maombi ya kazi"
      description={`Jina la kazi: ${job.title}`}
      cancelButtonAttributes={{
        value: "Ghairi",
        onClick: toggleContactFormHandler,
      }}
      submitButtonAttributes={{
        value: "Tuma",
        type: "submit",
        form: "contact-details-form",
      }}
    >
      <UserContactDetailsForm applyJobHandler={applyJobHandler} />
    </Modal>
  );
}
