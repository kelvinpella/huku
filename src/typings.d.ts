import { ComponentProps } from "react";
import { z, ZodIssue } from "zod";
import { BasicFormSchema } from "./common/schema/validationSchema";

/**
 * Signup options
 */
export type SignupOption = "phone" | "email" | "facebook" | "google";
/**
 * Signup Option Page Params
 */
export type SignupOptionParam = Promise<{ option: SignupOption }>;

/**
 * Basic user form
 */
export type BasicUserForm = z.infer<typeof BasicFormSchema>;

/**
 * Auth form input field
 */
export type AuthFormField = ComponentProps<"input"> & {
  label: string;
  name:
    | Exclude<keyof BasicUserForm, "passwords">
    | keyof BasicUserForm["passwords"];
};

/**
 * Signup form action payload
 */
export type FormActionPayload = {
  formData: FormData;
  currentStepInputFields: AuthFormField["name"][];
};

/**
 * Auth form state
 */
export type AuthFormState = {
  success?: boolean;
  inputs?: FormData;
  message: string;
  fieldErrors?: Record<
    FormActionPayload["currentStepInputFields"][number],
    ZodIssue["message"]
  >;
};
