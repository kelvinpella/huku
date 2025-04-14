import { LoginOption, AuthOption } from "@/typings";
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
  password: stringValidator("nywila").min(
    6,
    "Fupi! Nywila inatakiwa kuwa na herufi 6 au zaidi"
  ),
});

/**
 * Get the signup schema based on the selected signup option
 * Makes some fields optional
 * @param signupOption - signup method selected
 * @returns - signup chema
 */
export const getSignupFormSchema = (signupOption: AuthOption) => {
  const signupOptionToSchema = {
    phone: () => basicFormSchema.partial({ email: true }),
    email: () => basicFormSchema.partial({ phone: true }),
    facebook: () => basicFormSchema.partial(),
    google: () => basicFormSchema.partial(),
  } as const;

  const signupSchema = signupOptionToSchema[signupOption]();

  return signupSchema;
};

/**
 * Get login schema based on whether they login with phone number or email
 * @param  loginOption - phone or email
 * @returns - login schema
 */
export const getLoginSchema = (loginOption: LoginOption) => {
  const optionalField = loginOption === "phone" ? "email" : "phone";

  const loginSchema = basicFormSchema
    .pick({
      email: true,
      phone: true,
      password: true,
    })
    .partial({ [optionalField as "phone"]: true }) // TODO Typescript's partial fails to evaluate dynamic key of union type [optionalField as LoginOption]
    .partial({ [optionalField as "email"]: true });

  return loginSchema;
};
