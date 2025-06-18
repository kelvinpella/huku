import CustomButton from "@/components/Buttons/CustomButton";
import CustomField from "../CustomField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactDetailsSchema } from "@/lib/schema/validationSchema";
import { formInputFields } from "@/common/data/formInputFields";

const initialValues = {
  whatsapp: "",
  instagram: "",
};

export default function UserContactDetailsForm() {
  const {
    register,handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(contactDetailsSchema),
  });

  const getInputFields = () => {
    return formInputFields
      .filter(({ name }) => name === "whatsapp" || name === "instagram")
      .map((field) => {
        const errorMessage =
          errors[field.name as keyof typeof initialValues]?.message;
        return (
          <CustomField
            key={field.name}
            {...register(field.name as keyof typeof initialValues, {
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

  const cancelButtonHandler = () => {
    console.log("Ghairi button clicked");
  };
  const renderedInputFields = getInputFields();
  return (
    <div className="w-full my-4 py-2">
      <form onSubmit={handleSubmit(values=> {
        // TODO handle form submission 
        console.log("Form submitted with values:", values);
      })}>
        <h3>Njia za mawasiliano</h3>
        {renderedInputFields}
        <div className="w-full flex items-center justify-between gap-4">
          <CustomButton
            value="Ghairi"
            variant="neutral"
            onClick={cancelButtonHandler}
          />
          <CustomButton type="submit" value="Tuma" />
        </div>
      </form>
    </div>
  );
}
