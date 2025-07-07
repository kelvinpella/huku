import { getLoginSchema } from "@/lib/schema/validationSchema";
import { UserLoginForm } from "@/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomField from "../CustomField";
import { authFormInputFields } from "@/common/data/formInputFields";

type ForgotPasswordType = Pick<UserLoginForm, "email">;

type Props = {
  forgotPasswordSubmitHandler: (values: ForgotPasswordType) => void;
};
export default function ForgotPasswordForm({
  forgotPasswordSubmitHandler,
}: Props) {
  const defaultValues = {
    email: "",
  } as ForgotPasswordType;

  const forgotPasswordSchema = getLoginSchema("email").pick({ email: true });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <form
      id="forgot-password-form"
      onSubmit={handleSubmit((values) => forgotPasswordSubmitHandler(values))}
      noValidate
    >
      {authFormInputFields
        .filter((field) => field.name === "email")
        .map((field) => {
          const errorMessage =
            errors[field.name as keyof ForgotPasswordType]?.message;
          return (
            <CustomField
              key={field.name}
              {...field}
              {...register(field.name as keyof ForgotPasswordType, {
                setValueAs: (value) => {
                  if (value === "") return undefined;
                  return value;
                },
              })}
              errorMessage={errorMessage}
            />
          );
        })}
    </form>
  );
}
