"use client";

import { postJobInputFields } from "@/common/data/formInputFields";
import { postJobSchema } from "@/lib/schema/validationSchema";
import { PostJobForm } from "@/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomField from "../Forms/CustomField";
import CustomButton from "../Buttons/CustomButton";
import { useRouter } from "next/navigation";
import { publishJobAction } from "@/common/actions/publishJobAction";
import { toastNotification } from "@/common/functions/toastNotification";
import { revalidateSwrPartialKeys } from "@/common/functions/revalidateSwrPartialKeys";
import { use, useEffect } from "react";
import { useJobs } from "@/common/hooks/useJobs";

type Props = {
  pageParamsPromise: Promise<{
    pageParams: string[] | undefined;
  }>;
};
export default function PostJob({ pageParamsPromise }: Props) {
  const { pageParams } = use(pageParamsPromise);

  const [jobId,edit] = pageParams ?? [];

  const { jobs } = useJobs(jobId, !!jobId);

  const router = useRouter();

  const defaultValues: PostJobForm = {
    title: "",
    description: "",
    budget: 10000,
    skills: "",
  };

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<PostJobForm>({
    defaultValues,
    resolver: zodResolver(postJobSchema),
  });

  useEffect(() => {
    if (jobs) {
      jobs.flat().forEach((job) => {
        Object.entries(job).forEach(([key, value]) =>
          setValue(key as keyof PostJobForm, value as string | number)
        );
      });
    }
  }, [jobs, setValue]);

  const getInputFields = () => {
    return postJobInputFields.map((field) => {
      const errorMessage = errors[field.name]?.message;
      return (
        <CustomField
          key={field.name}
          {...field}
          {...register(field.name, {
            setValueAs: (value) => {
              if (value === "") return undefined;
              return value;
            },
          })}
          errorMessage={errorMessage}
        />
      );
    });
  };

  const inputFields = getInputFields();

  const publishJobHandler = async (values: PostJobForm) => {
    const { data } = await publishJobAction(values,jobId);
    if (data) {
      toastNotification({
        args: [
          "Job posted successfully",
          {
            type: "success",
          },
        ],
      });
      reset();
      revalidateSwrPartialKeys(["/api/getJobs"]);
    } else {
      toastNotification({
        args: [
          "Failed to post job",
          {
            type: "error",
          },
        ],
      });
    }
  };

  const goBackHandler = () => {
    router.back();
  };

  return (
    <div className="w-full md:max-w-lg mx-auto">
      <form
        noValidate
        onSubmit={handleSubmit((values) => publishJobHandler(values))}
      >
        <h1 className="text-center">
          {edit ? "Edit Job Posting" : "Post a Job"}
        </h1>
        {inputFields}
        <div className="w-full flex items-center justify-between my-4 py-2">
          <CustomButton
            value="Cancel"
            variant="neutral"
            className={"!text-sm"}
            onClick={goBackHandler}
          />
          <CustomButton
            type="submit"
            value={edit ? "Update" : "Publish"}
            className="!text-sm"
          />
        </div>
      </form>
    </div>
  );
}
