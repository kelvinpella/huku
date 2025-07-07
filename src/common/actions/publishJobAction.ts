"use server";

import { Job, PostJobForm } from "@/typings";
import { createClient } from "@/utils/supabase/server";

export async function publishJobAction(
  values: PostJobForm,
  jobId: Job["id"] | undefined
) {
  const { skills } = values;
  const skillsArray = skills.split(",").map((s) => s.trim());

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (jobId) {
    return await supabase
      .from("jobs")
      .update({ ...values, skills: skillsArray })
      .eq("id", jobId)
      .select();
  }

  return await supabase
    .from("jobs")
    .insert({
      ...values,
      skills: skillsArray,
      created_by: user?.id,
    })
    .select();
}
