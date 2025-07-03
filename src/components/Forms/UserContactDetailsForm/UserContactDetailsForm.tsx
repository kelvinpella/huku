import CustomField from "../CustomField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactDetailsSchema } from "@/lib/schema/validationSchema";
import { formInputFields } from "@/common/data/formInputFields";
import { contactDetailsFormInitialValues } from "@/common/data/contactDetailsFormInitialValues";
import { ContactDetailsForm } from "@/typings";
import UserImageDropzone from "./UserImageDropzone";
import { use } from "react";
import { JobPostContext } from "@/common/context/JobPostContext";
import { useUser } from "@/common/hooks/useUser";

export default function UserContactDetailsForm() {
  const { applyJobHandler } = use(JobPostContext);
  const { user } = useUser();

  const contactDetails = user?.user_metadata
    ?.contact_details as ContactDetailsForm;

  const formMethods = useForm({
    defaultValues: { ...contactDetailsFormInitialValues, ...contactDetails },
    resolver: zodResolver(contactDetailsSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const getInputFields = () => {
    return formInputFields
      .filter(({ name }) => name === "whatsapp" || name === "instagram")
      .map((field) => {
        const errorMessage =
          errors[field.name as keyof ContactDetailsForm]?.message;
        return (
          <CustomField
            key={field.name}
            {...register(field.name as keyof ContactDetailsForm, {
              setValueAs: (value) => {
                if (value === "") return undefined; // to trigger required error in zod
                return value;
              },
            })}
            {...field}
            errorMessage={errorMessage}
            visualInputSize="small"
          />
        );
      });
  };

  const renderedInputFields = getInputFields();
  return (
    <div className="w-full my-2 py-1">
      <FormProvider {...formMethods}>
        <form
          id="contact-details-form"
          onSubmit={handleSubmit(applyJobHandler)}
          className="w-full flex flex-col gap-2"
        >
          <h3>Njia za mawasiliano</h3>
          <div className="w-full lg:flex lg:gap-4">{renderedInputFields}</div>
          <h3>Picha zako</h3>
          <UserImageDropzone />
        </form>
      </FormProvider>
    </div>
  );
}
