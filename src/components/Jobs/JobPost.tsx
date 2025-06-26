import { ContactDetailsForm, DownloadableImage, Job } from "@/typings";
import JobPostContent from "./JobPostContent";
import { useCallback, useState, useTransition } from "react";
import Modal from "../Modal/Modal";
import UserContactDetailsForm from "../Forms/UserContactDetailsForm/UserContactDetailsForm";
import { useUser } from "@/common/hooks/useUser";
import { sendJobApplication } from "@/common/functions/sendJobApplication";
import { useOptimisticApplicationStatus } from "@/common/hooks/useOptimisticApplicationStatus";
import { toastNotification } from "@/common/functions/toastNotification";
import { JobPostContext } from "@/common/context/JobPostContext";
import { revalidateSwrPartialKeys } from "@/common/functions/revalidateSwrPartialKeys";
import { updateUserContactDetails } from "@/common/functions/updateUserContactDetails";

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

  const [imagesToDeleteFromSupabase, setImagesToDeleteFromSupabase] = useState<
    DownloadableImage[]
  >([]);

  const [openModal, setOpenModal] = useState(false);
  const [, startTransition] = useTransition();

  const toggleContactFormHandler = useCallback(() => {
    setOpenModal((prevState) => !prevState);
  }, []);

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
      setOptimisticApplicationStatus,
      toggleContactFormHandler,
      setApplicationStatus,
    ]
  );

  return (
    <JobPostContext
      value={{
        job,
        toggleContactFormHandler,
        applyJobHandler,
        imagesToDeleteFromSupabase,
        setImagesToDeleteFromSupabase,
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
        <UserContactDetailsForm />
      </Modal>
    </JobPostContext>
  );
}
