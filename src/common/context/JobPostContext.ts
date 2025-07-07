import { 
  DownloadableImage,
  Job,
} from "@/typings";
import { createContext, Dispatch, SetStateAction } from "react";

type JobContextType = {
  job: Job;
  imagesToDeleteFromSupabase: DownloadableImage[];
  setImagesToDeleteFromSupabase: Dispatch<SetStateAction<DownloadableImage[]>>;
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
  imagesToDeleteFromSupabase: [],
  setImagesToDeleteFromSupabase: () => {},
});
