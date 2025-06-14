import { Job } from "@/typings";
import { formatDistanceToNow } from "date-fns";
import React from "react";

type Props = {
  job: Job;
};

export default function JobPost({ job }: Props) {
  const { title, created_at, description, budget } = job;

  const formattedDate = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });

  const formattedBudget = new Intl.NumberFormat("sw-TZ", {
    style: "currency",
    currency: "TZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(budget);
// TODO Required skill should be in their own column and not part of description in supabase
  return (
    <div className="w-full px-2 py-2">
      <h3>{title}</h3>
      <p className="text-sm">{formattedDate}</p>
      {/* TODO extract description to own component to handle show more / less feature */}
      <div className="w-full py-4">
          <p>{description}</p>
      </div>
      <div className="w-full flex items-center gap-2">
        <span className="">Bajeti:</span>
        <span className="text-sm font-semibold">{formattedBudget}</span>
      </div>
    </div>
  );
}
