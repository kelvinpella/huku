import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const stringValidator = (fieldName: string) =>
  z.string().min(1, `Tafadhali andika ${fieldName}`);

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
 * Signup form validation schema
 */
export const signupFormSchema = basicFormSchema.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: "Samahani nywila hazifanani",
    path: ["confirmPassword"],
  }
);
