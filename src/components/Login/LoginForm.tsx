import { formInputFields } from "@/common/data/formInputFields";
import { LoginOption, UserLoginForm } from "@/typings";
import CustomInputElement from "../Forms/CustomInputElement";
import { useForm } from "react-hook-form";
import { getLoginSchema } from "@/lib/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicFormInitialValues } from "@/common/data/basicFormInitialValues";
import CustomButton from "../Buttons/CustomButton";
import { useRouter } from "next/navigation";

type Props = {
  loginOption: LoginOption;
};

export default function LoginForm({ loginOption }: Props) {
  const router = useRouter();

  const loginSchema = getLoginSchema(loginOption);

  const defaultValues = {
    phone: basicFormInitialValues.phone,
    email: basicFormInitialValues.email,
    password: basicFormInitialValues.password,
  } as UserLoginForm;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(loginSchema) });

  const getInputFields = () => {
    return formInputFields
      .filter(
        ({ name }) =>
          name === "email" || name === "phone" || name === "password"
      )
      .map((field) => {
        const isHiddenField =
          field.name !== "password" && field.name !== loginOption;
        const errorMessage = errors[field.name as keyof UserLoginForm]?.message;

        return (
          <CustomInputElement
            key={field.name}
            {...field}
            {...register(field.name as keyof UserLoginForm, {
              setValueAs: (value) => {
                if (value === "") return undefined;
                return value;
              },
            })}
            hidden={isHiddenField}
            errorMessage={errorMessage}
          />
        );
      });
  };

  const inputFields = getInputFields();

  // TODO handle form submission
  return (
    <div>
      <form onSubmit={handleSubmit((val) => console.log(val))}>
        {inputFields}
        <div className="my-4 py-2 flex items-center justify-between">
          <CustomButton
            variant="neutral"
            value="Rudi Nyuma"
            onClick={() => router.back()}
          />
          <CustomButton type="submit" value="Ingia" />
        </div>
      </form>
    </div>
  );
}
