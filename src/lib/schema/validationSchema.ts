import { SignupOption } from "@/typings";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const stringValidator = (fieldName: string) =>
  z.string({ required_error: `Tafadhali andika ${fieldName}` });

/**
 * Validation schema for basic form
 */
export const basicFormSchema = z.object({
  firstname: stringValidator("jina la kwanza"),
  lastname: stringValidator("jina la ukoo"),
  phone: stringValidator("namba ya simu").refine(
    (value) => {
      return isValidPhoneNumber(value, "TZ"); // default to Tanzanian phone numbers,
    },
    { message: "Tafadhali andika namba ya simu sahihi" }
  ),
  email: stringValidator("barua pepe").email(
    "Tafadhali andika barua pepe sahihi"
  ),
  location: stringValidator("eneo"),
  password: stringValidator("nywila"),
  confirmPassword: stringValidator("nywila"),
});

/**
 * Get the signup schema based on the selected signup option
 * Makes some fields optional
 * @param signupOption - signup method selected
 * @returns - signup chema
 */
export const getSignupFormSchema = (signupOption: SignupOption) => {
  const signupOptionToSchema = {
    phone: () => basicFormSchema.partial({ email: true }),
    email: () => basicFormSchema.partial({ phone: true }),
    facebook: () => basicFormSchema.partial(),
    google: () => basicFormSchema.partial(),
  } as const;

  const partialSchema = signupOptionToSchema[signupOption]();

  const signupSchema = partialSchema.refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    {
      message: "Samahani nywila hazifanani",
      path: ["confirmPassword"],
    }
  );

  return signupSchema;
};
