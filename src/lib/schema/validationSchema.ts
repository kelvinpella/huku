import { LoginOption, AuthOption } from "@/typings";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

/**
 * This class contains methods to create common validation schemas
 */
class SchemaMethods {
  stringValidator(fieldName: string) {
    return z.string({ required_error: `Please enter ${fieldName}` });
  }

  phoneNumberValidator() {
    return this.stringValidator("phone number").refine(
      (value) => {
        return isValidPhoneNumber(value, "TZ"); // default to Tanzanian phone numbers
      },
      { message: "Please enter a valid phone number" }
    );
  }

  private donwloadImageSchema() {
    // This defines the structure of the stored image in the user's meta_data
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

          // Simulate downloaded files
          return { type: "image/png", size: 1024 };
        }) as File[];

        // Ensure all files are images
        const hasImagesOnly = files.every((file) =>
          file.type.startsWith("image/")
        );
        if (!hasImagesOnly) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Only image files are allowed",
            fatal: true, // abort early to avoid performing other checks
          });
          return z.NEVER; // required when aborting early using `fatal`
        }

        // Ensure each image does not exceed 5MB
        const hasNormalImageSizes = files.every(
          (file) => file.size <= 5 * 1024 * 1024
        );
        if (!hasNormalImageSizes) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Each image must be less than 5MB",
            fatal: true,
          });
          return z.NEVER;
        }

        const numberOfFiles = files.length;

        // Exactly two images are required
        if (numberOfFiles < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please upload two images",
            fatal: true,
          });
          return z.NEVER;
        }

        if (numberOfFiles > 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Uploading more than two images is not allowed",
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
  firstname: schemaMethods.stringValidator("first name"),
  lastname: schemaMethods.stringValidator("last name"),
  phone: schemaMethods.phoneNumberValidator(),
  email: schemaMethods
    .stringValidator("email")
    .email("Please enter a valid email address"),
  location: schemaMethods.stringValidator("location"),
  password: schemaMethods
    .stringValidator("password")
    .min(6, "Password must be at least 6 characters long"),
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
      password: schemaMethods.stringValidator("password"), // override the password field to not check length
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
    instagram: schemaMethods.stringValidator("Instagram account").optional(),
    images: schemaMethods.imagesValidator(),
  })
  .refine((data) => !!(data.whatsapp || data.instagram), {
    message: "Please enter at least one contact information",
    path: ["instagram"],
  });

export const postJobSchema = z.object({
  title: schemaMethods
    .stringValidator("job title")
    .min(10, "Job title must be at least 10 characters long")
    .max(150, "Job title must not exceed 150 characters"),
  description: schemaMethods
    .stringValidator("job description")
    .min(150, "Description must be at least 150 characters long")
    .max(2000, "Description must not exceed 2000 characters"),
  budget: z.coerce
    .number({
      required_error: "Please enter a budget in Tsh",
    })
    .min(1, "Invalid budget"),
  skills: schemaMethods
    .stringValidator("required skills")
    .refine((val) => val.split(",").map((s) => s.trim()).length > 0, {
      message: "Please enter at least one skill",
    }),
});
