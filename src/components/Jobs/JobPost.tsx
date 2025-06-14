import { Job } from "@/typings";
import React from "react";

type Props = {
  job: Job;
};

export default function JobPost({ job }: Props) {
  return <div>{job.title}</div>;
}
