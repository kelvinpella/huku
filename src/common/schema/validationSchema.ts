import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const commonValidator = (fieldName: string) =>
  z
    .string({
      required_error: `Tafadhali ${fieldName} inahitajika`,
      invalid_type_error: `Tafadhali andika ${fieldName} sahihi`,
    })
    .min(1, `Tafadhali andika ${fieldName}`);

const PasswordSchema = z
  .object({
    password: commonValidator("nywila"),
    confirmPassword: commonValidator("nywila"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Samahani nywila hazifanani",
    path: ["confirmPassword"],
  });

/**
 * Validation schema for basic form
 */
export const BasicFormSchema = z.object({
  firstname: commonValidator("jina la kwanza"),
  lastname: commonValidator("jina la ukoo"),
  phone: commonValidator("namba ya simu").refine((value) => {
    return isValidPhoneNumber(value, "TZ"); // default to Tanzanian phone numbers
  }),
  email: commonValidator("barua pepe").email(),
  location: commonValidator("eneo"),
  passwords: PasswordSchema,
});
