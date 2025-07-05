import { getUser } from "@/common/functions/getUser";
import JobLoadingSkeleton from "@/components/CustomLoaders/JobLoadingSkeleton";
import { User } from "@supabase/supabase-js";
import { useMemo } from "react";
import useSWR from "swr";
import JobApplicantDetails from "./JobApplicantDetails";

type Props = {
  userId: User["id"];
};
export default function JobApplicant({ userId }: Props) {
  const { data, isLoading } = useSWR(["/api/getUser", userId], getUser);

  const applicant = useMemo(() => {
    if (data) {
      return <JobApplicantDetails userDetails={data} />;
    }
    if (isLoading) {
      return <JobLoadingSkeleton />;
    }
    return <div className="italic py-2 text-gray-500">Taarifa za mtumiaji hazipatikani</div>;
  }, [data, isLoading]);

  return <div className="w-full">{applicant}</div>;
}
