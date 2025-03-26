import {
  ComponentProps, 
} from "react";

/**
 * Signup options
 */
export type SignupOption = "phone" | "email" | "facebook" | "google";
/**
 * Signup Option Page Params
 */
export type SignupOptionParam = Promise<{ option: SignupOption }>;

/**
 * Auth Form Field
 */
export type AuthFormField = ComponentProps<"input"> & {
  label: string;
  id:
    | "firstname"
    | "lastname"
    | "phone"
    | "email"
    | "location"
    | "password"
    | "confirmPassword";
};
