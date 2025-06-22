import { formInputFields } from "@/common/data/formInputFields";
import { LoginOption, UserLoginForm } from "@/typings";
import { useForm } from "react-hook-form";
import { getLoginSchema } from "@/lib/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../Buttons/CustomButton";
import { useRouter } from "next/navigation";
import { loginAction } from "@/common/actions/loginAction";
import CustomField from "../Forms/CustomField";
import { toastNofication } from "@/common/functions/toastNotification";
import { authFormInitialValues } from "@/common/data/authFormInitialValues";

type Props = {
  loginOption: LoginOption;
};

export default function LoginForm({ loginOption }: Props) {
  const router = useRouter();

  const loginSchema = getLoginSchema(loginOption);

  const defaultValues = {
    phone: authFormInitialValues.phone,
    email: authFormInitialValues.email,
    password: authFormInitialValues.password,
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
          <CustomField
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

  const loginUserHandler = async (values: UserLoginForm) => {
    const { error } = await loginAction(values, loginOption);
    if (error) {
      toastNofication({
        args: [
          "Imeshindikana kuingia. Jaribu tena!",
          {
            type: "error",
          },
        ],
      });

      return;
    }

    toastNofication({ args: ["Umefanikiwa kuingia!", { type: "success" }] });

    // redirect to the jobs page
    router.push("/jobs");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((values) => loginUserHandler(values))}
        noValidate
      >
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
