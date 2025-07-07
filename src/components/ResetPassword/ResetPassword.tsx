"use client";
import { getLoginSchema } from "@/lib/schema/validationSchema";
import { UserLoginForm } from "@/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomField from "../Forms/CustomField";
import { authFormInputFields } from "@/common/data/formInputFields";
import CustomButton from "../Buttons/CustomButton";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "@/common/actions/resetPasswordAction";
import { toastNotification } from "@/common/functions/toastNotification";

type ResetPasswordType = Pick<UserLoginForm, "password">;

export default function ResetPassword() {
  const router = useRouter();

  const defaultValues = {
    password: "",
  } as ResetPasswordType;

  const schema = getLoginSchema("email").pick({ password: true });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const resetPasswordHandler = async (values: ResetPasswordType) => {
    const { data } = await resetPasswordAction(values);
    if (data) {
      toastNotification({
        args: [
          "Umefanikiwa kubadili nywila",
          {
            type: "success",
          },
        ],
      });
      reset();
      router.push("/jobs");
    } else {
      toastNotification({
        args: [
          "Imeshindikana kubadili nywila. Jaribu tena",
          {
            type: "error",
          },
        ],
      });
    }
  };
  const goBackHandler = () => {
    router.push("/jobs");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="w-full max-w-lg"
        noValidate
        onSubmit={handleSubmit((values) => resetPasswordHandler(values))}
      >
        <h1>Badili Nywila ( Password )</h1>
        <div className="w-full py-2">
          {authFormInputFields
            .filter((field) => field.name === "password")
            .map((field) => {
              const errorMessage =
                errors[field.name as keyof ResetPasswordType]?.message;
              return (
                <CustomField
                  key={field.name}
                  {...field}
                  {...register(field.name as keyof ResetPasswordType, {
                    setValueAs: (value) => {
                      if (value === "") return undefined;
                      return value;
                    },
                  })}
                  errorMessage={errorMessage}
                />
              );
            })}
        </div>
        <div className="w-full flex items-center justify-between gap-4 py-2">
          <CustomButton
            value="Ghairi"
            onClick={goBackHandler}
            variant="neutral"
            className="!text-sm"
          />
          <CustomButton value="Badili" type="submit" className="!text-sm" />
        </div>
      </form>
    </div>
  );
}
