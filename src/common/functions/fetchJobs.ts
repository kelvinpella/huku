import { Job } from "@/typings";
import axios from "axios";

/**
 * Fetches a list of jobs from the route handler.
 *
 * @param url - The endpoint URL to the route handler to fetch jobs from.
 * @returns A promise that resolves to an array of `Job` objects.
 * @throws Will throw an error if the HTTP request fails.
 */

export const fetchJobs = async (url: string): Promise<Job[]> => {
  const response = await axios.get(url);

  return response.data;
};
