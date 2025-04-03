import { ComponentProps } from "react";
import { z } from "zod";
import { basicFormSchema, getLoginSchema } from "./lib/schema/validationSchema";

/**
 * Basic user form
 */
export type BasicForm = Partial<z.infer<typeof basicFormSchema>>;


/**
 * Login form
 */
export type UserLoginForm =z.infer<ReturnType<typeof getLoginSchema>>

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
 * Login option
 */
export type LoginOption = Extract<SignupOption, "phone" | "email">;

/**
 * Auth Page Option Params
 */
export type AuthPageParam<T extends "login" | "signup"> = Promise<{
  option: T extends "login" ? LoginOption : SignupOption;
}>;

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
