import { ComponentProps } from "react";
import { z } from "zod";
import { basicFormSchema, getLoginSchema } from "./lib/schema/validationSchema";
import { User } from "@supabase/supabase-js";

/**
 * Basic user form
 */
export type BasicForm = Partial<z.infer<typeof basicFormSchema>>;

/**
 * Login form
 */
export type UserLoginForm = z.infer<ReturnType<typeof getLoginSchema>>;

/**
 * Signup step
 */
export type SignupStep = {
  stepName: string;
  fields: (keyof BasicForm)[];
};

/**
 * Auth option
 */
export type AuthOption = "phone" | "email" | "facebook" | "google";

/**
 * Login option
 */
export type LoginOption = Extract<AuthOption, "phone" | "email">;

/**
 * Auth Page Option Params
 */
export type AuthPageParam<T extends "login" | "signup"> = Promise<{
  option: T extends "login" ? LoginOption : AuthOption;
}>;

/**
 * Form input field
 */
export type FormInputField = ComponentProps<"input"> &
  ComponentProps<"select"> & {
    name: keyof BasicForm;
    label: string;
  };

/**
 * Navigation direction for the multistep form
 */
type MultiStepFormNavigation = "previous" | "next";

/**
 * Job type
 */
type Job = {
  created_at: string;
  created_by: User["id"];
  title: string;
  description: string;
  budget: number;
  id: string;
  skills: string[];
  applicants: User["id"][] | null;
};
