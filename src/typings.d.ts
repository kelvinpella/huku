import { ComponentProps } from "react";
import { z, ZodIssue } from "zod";
import {
  basicFormSchema,
  BasicFormSchema,
} from "./lib/schema/validationSchema";

/**
 * Basic user form
 */
export type BasicForm = z.infer<typeof basicFormSchema>;

/**
 * Signup step
 */
export type SignupStep = {
  stepName: string;
  fields: (keyof BasicForm)[];
};

/**
 * Signup options
 */
export type SignupOption = "phone" | "email" | "facebook" | "google";
/**
 * Signup Option Page Params
 */
export type SignupOptionParam = Promise<{ option: SignupOption }>;

/**
 * Form input field
 */
export type FormInputField = ComponentProps<"input"> & {
  name: keyof BasicForm
  label: string;
};

/**
 * Navigation direction for the multistep form
 */
type MultiStepFormNavigation = 'previous' | 'next'
///////////////////////////////////////////////////////




 
// /**
//  * Auth form state
//  */
// export type AuthFormState = {
//   success?: boolean;
//   inputs?: FormData;
//   message: "no action" | "form error" | "next step";
//   formCompleted: boolean;
//   fieldErrors?: Record<
//     FormActionPayload["currentStepInputFields"][number],
//     ZodIssue["message"]
//   >;
// };

// /**
//  * Signup form action payload
//  */
// export type FormActionPayload = {
//   formData: FormData;
//   currentStepInputFields: AuthFormField["name"][];
//   formCompleted: AuthFormState["formCompleted"];
// };
