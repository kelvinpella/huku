import { ApplicationStatus, ContactDetailsForm, Job } from "@/typings";
import { createContext } from "react";

/**
 * Context type for job posting related state and actions.
 *
 * @typedef {Object} JobContextType
 * @property {Job} job - The current job object.
 * @property {() => void} toggleContactFormHandler - Handler to toggle the contact form visibility.
 * @property {ApplicationStatus | null} applicationStatus - The current application status or null if not set.
 * @property {(values: ContactDetailsForm) => void} applyJobHandler - Handler to apply for a job with contact details.
 */

/**
 * React context for job posting, providing job data and related handlers.
 * 
 * @default
 * Provides default values for the context, including an empty job object,
 * no-op handlers, and a null application status.
 */
type JobContextType = {
  job: Job;
  toggleContactFormHandler: () => void;
  applicationStatus: ApplicationStatus | null;
  applyJobHandler: (values: ContactDetailsForm) => void;
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
});
