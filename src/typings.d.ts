import { ComponentProps, JSX } from "react";
import { z } from "zod";
import {
  authFormSchema,
  getLoginSchema,
  contactDetailsSchema,
} from "./lib/schema/validationSchema";
import { User } from "@supabase/supabase-js";

/**
 * Auth forms are forms used for user authentication, such as login and signup.
 */
export type AuthForm = Partial<z.infer<typeof authFormSchema>>;

/**
 * This form is used to collect additional contact information from the user ( whatsapp and instagram)
 */
export type ContactDetailsForm = z.infer<typeof contactDetailsSchema>;

export type LocalOrDownloadableFile = ContactDetailsForm["images"][number];

export type DownloadableImage = Exclude<LocalOrDownloadableFile, File>;

export type LocalFile = Exclude<LocalOrDownloadableFile, DownloadableImage>;

/**
 * Login form
 */
export type UserLoginForm = z.infer<ReturnType<typeof getLoginSchema>>;

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
    name: keyof AuthForm | keyof ContactDetailsForm;
    label: string;
  };

/**
 * Signup step
 */
export type SignupStep = {
  stepName: string;
  fields: Exclude<
    FormInputField["name"],
    "whatsapp" | "instagram" | "images"
  >[];
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

/**
 * Job application status
 */
export type ApplicationStatus = "pending" | "applied" | "not_applied";

type MenuItemLink = {
  link: string;
  action?: never;
};

type MenuItemAction = {
  action: string;
  link?: never;
};

export type CustomMenuItem = {
  name: string;
  id: string;
  icon: JSX.Element;
} & (MenuItemLink | MenuItemAction);

export type ComponentsWithMenu = "profile" | "signup" | "login";

export type Variant = "primary" | "neutral" | "outline" | "plain" | 'danger'
