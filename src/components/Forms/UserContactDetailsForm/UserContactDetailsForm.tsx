import CustomButton from "@/components/Buttons/CustomButton";
import CustomField from "../CustomField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactDetailsSchema } from "@/lib/schema/validationSchema";
import { formInputFields } from "@/common/data/formInputFields";
import { contactDetailsFormInitialValues } from "@/common/data/contactDetailsFormInitialValues";
import { ContactDetailsForm } from "@/typings";

type Props = {
  toggleContactFormHandler: () => void;
  applyJobHandler: (values: ContactDetailsForm) => void;
  contactDetails: ContactDetailsForm | undefined;
};

export default function UserContactDetailsForm({
  toggleContactFormHandler,
  applyJobHandler,
  contactDetails,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...contactDetailsFormInitialValues, ...contactDetails },
    resolver: zodResolver(contactDetailsSchema),
  });

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
          />
        );
      });
  };

  const renderedInputFields = getInputFields();
  return (
    <div className="w-full my-4 py-2">
      <form onSubmit={handleSubmit(applyJobHandler)}>
        <h3>Njia za mawasiliano</h3>
        {renderedInputFields}
        <div className="w-full flex items-center justify-between gap-4 my-2 py-2">
          <CustomButton
            value="Ghairi"
            variant="neutral"
            onClick={toggleContactFormHandler}
          />
          <CustomButton type="submit" value="Tuma" />
        </div>
      </form>
    </div>
  );
}
