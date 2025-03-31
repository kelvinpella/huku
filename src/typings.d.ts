import { ComponentProps } from "react";
import { z } from "zod";
import {
  basicFormSchema, 
} from "./lib/schema/validationSchema";

/**
 * Basic user form
 */
export type BasicForm = Partial<z.infer<typeof basicFormSchema>>;

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
  name: keyof BasicForm;
  label: string;
};

/**
 * Navigation direction for the multistep form
 */
type MultiStepFormNavigation = "previous" | "next";
