import { Job } from "@/typings";
import JobPostContent from "./JobPostContent";
import { useState } from "react";
import Modal from "../Modal/Modal";
import UserContactDetailsForm from "../Forms/UserContactDetailsForm/UserContactDetailsForm";

type Props = {
  job: Job;
};

export default function JobPost({ job }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const applyJobHandler = () => {
    // TODO Open dialog to fill communication details
    setOpenModal(true);
    // TODO Update user metadata with communication details
    // TODO Add job application to the database ( useOptimistic)
  };

  const toggleModalHandler = ( ) => {
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <JobPostContent job={job} applyJobHandler={applyJobHandler} />
      <Modal
        open={openModal}
        onClose={toggleModalHandler}
        title="Maombi ya kazi"
        description={`Jina la kazi: ${job.title}`}
      >
       <UserContactDetailsForm/>
      </Modal>
    </>
  );
}
