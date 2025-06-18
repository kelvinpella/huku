import { LoginOption, AuthOption } from "@/typings";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

/** 
 * This class contains methods to create common validation schemas
 */
class SchemaMethods {
  stringValidator(fieldName: string) {
    return z.string({ required_error: `Tafadhali andika ${fieldName}` });
  }

  phoneNumberValidator() {
    return this.stringValidator("namba ya simu").refine(
      (value) => {
        return isValidPhoneNumber(value, "TZ"); // default to Tanzanian phone numbers,
      },
      { message: "Tafadhali andika namba ya simu sahihi" }
    );
  }
}

const schemaMethods = new SchemaMethods();

/**
* Validation schema for authentication forms
 */
export const authFormSchema = z.object({
  firstname: schemaMethods.stringValidator("jina la kwanza"),
  lastname: schemaMethods.stringValidator("jina la ukoo"),
  phone: schemaMethods.phoneNumberValidator(),
  email: schemaMethods
    .stringValidator("barua pepe")
    .email("Tafadhali andika barua pepe sahihi"),
  location: schemaMethods.stringValidator("eneo"),
  password: schemaMethods
    .stringValidator("nywila")
    .min(6, "Nywila inatakiwa kuwa na herufi 6 au zaidi"),
});

/**
 * Get the signup schema based on the selected signup option
 * Makes some fields optional
 * @param signupOption - signup method selected
 * @returns - signup chema
 */
export const getSignupFormSchema = (signupOption: AuthOption) => {
  const signupOptionToSchema = {
    phone: () => authFormSchema.partial({ email: true }),
    email: () => authFormSchema.partial({ phone: true }),
    facebook: () => authFormSchema.partial(),
    google: () => authFormSchema.partial(),
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

  const loginSchema = authFormSchema
    .pick({
      email: true,
      phone: true,
      password: true,
    })
    .extend({
      password: schemaMethods.stringValidator("nywila"), // override the password field to not check length
    })
    .partial({ [optionalField as "phone"]: true })
    .partial({ [optionalField as "email"]: true });

  return loginSchema;
};

/**
 * Validation schema for user contact details
 * At least one of the fields must be provided
 */
export const contactDetailsSchema = z
  .object({
    whatsapp: schemaMethods.phoneNumberValidator(),
    instagram: schemaMethods.stringValidator("akaunti ya Instagram"),
  })
  .refine((data) => !!(data.whatsapp || data.instagram), {
    message: "Tafadhali andika njia moja ya mawasiliano",
    path:['instagram']
  });
