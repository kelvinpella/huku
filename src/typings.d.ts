import { ComponentProps } from "react"; 
import { z } from "zod";
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
  id: Exclude<keyof BasicUserForm,'passwords'> | keyof BasicUserForm['passwords']
};

/**
 * Signup form action payload
 */
export type FormActionPayload = {
  formData: FormData;
  currentStepInputFields:AuthFormField['id'][]
};
