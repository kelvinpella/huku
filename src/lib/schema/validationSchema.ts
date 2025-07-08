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

  private donwloadImageSchema() {
    // This will be structure of the stored image in user's meta_data
    return z.object({
      downloadUrl: z.string(),
      storageId: z.string(),
      storagePath: z.string(),
    });
  }

  imagesValidator() {
    return z
      .array(z.instanceof(File).or(this.donwloadImageSchema()))
      .superRefine((allFiles, ctx) => {
        const files = allFiles.map((file) => {
          if (file instanceof File) return file;

          // manipulate downloaded files
          return { type: "image/png", size: 1024 };
        }) as File[];

        // check type of file
        const hasImagesOnly = files.every((file) =>
          file.type.startsWith("image/")
        );
        if (!hasImagesOnly) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Unatakiwa kuweka picha tu",
            fatal: true, // abort early to avoid performing other checks
          });
          return z.NEVER; // required when aborting early using `fatal`
        }

        // check size of each image not exceed 5MB
        const hasNormalImageSizes = files.every(
          (file) => file.size <= 5 * 1024 * 1024
        );
        if (!hasNormalImageSizes) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Kila picha inapaswa kuwa chini ya 5MB",
            fatal: true,
          });
          return z.NEVER;
        }

        const numberOfFiles = files.length;

        // only two images are allowed. Nothing nothing less
        if (numberOfFiles < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Tafadhali weka picha mbili",
            fatal: true,
          });
          return z.NEVER;
        }

        if (numberOfFiles > 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Hairuhusiwi kuweka picha zaidi ya mbili",
          });
        }
      });
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
    whatsapp: schemaMethods.phoneNumberValidator().optional(),
    instagram: schemaMethods.stringValidator("akaunti ya Instagram").optional(),
    images: schemaMethods.imagesValidator(),
  })
  .refine((data) => !!(data.whatsapp || data.instagram), {
    message: "Tafadhali andika njia moja ya mawasiliano",
    path: ["instagram"],
  });

export const postJobSchema = z.object({
  title: schemaMethods
    .stringValidator("jina la kazi")
    .min(10, "Jina la kazi fupi sana")
    .max(150, "Jina linatikiwa lisizidi herufi 150"),
  description: schemaMethods
    .stringValidator("maelezo ya kazi")
    .min(150, "Maelezo yanatakiwa walau herufi 150")
    .max(2000, "Maelezo yanatakiwa yasizidi herufi 2000"),
  budget: z.coerce
    .number({
      required_error: "Tafadhali andika bajeti kwa Tsh",
    })
    .min(1, "Bajeti sio sahihi"),
  skills: schemaMethods
    .stringValidator("ujuzi unaotakiwa")
    .refine((val) => val.split(",").map((s) => s.trim()).length > 0, {
      message: "Tafadhali andika angalau ujuzi mmoja",
    }),
});
