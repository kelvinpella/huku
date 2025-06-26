import { ApplicationStatus, ContactDetailsForm, DownloadableImage, Job } from "@/typings";
import { createContext, Dispatch, SetStateAction } from "react";
 
type JobContextType = {
  job: Job;
  toggleContactFormHandler: () => void;
  applicationStatus: ApplicationStatus | null;
  applyJobHandler: (values: ContactDetailsForm) => void;
  imagesToDeleteFromSupabase:DownloadableImage[];
  setImagesToDeleteFromSupabase:Dispatch<SetStateAction<DownloadableImage[]>>
};

export const JobPostContext = createContext<JobContextType>({
  job: {
    created_at: "",
    created_by: "",
    title: "",
    description: "",
    budget: 656,
    id: "",
    skills: [],
    applicants: [],
  },
  toggleContactFormHandler: () => {},
  applicationStatus: null,
  applyJobHandler: () => {},
  imagesToDeleteFromSupabase:[],
  setImagesToDeleteFromSupabase:()=>{}
});
