
/**
 * Signup options
 */
export type SignupOption = "phone" | "email" | "facebook" | "google"
/**
 * Signup Option Page Params
 */
export type SignupOptionParam = Promise<{ option: SignupOption }>

/**
 * Auth Form Field
 */
export type AuthFormField = Record<"name" | "label" | "placeholder" | "type", string> & { id: "firstname" | "lastname" | "phone" | "email" | "location" | "password" | "confirm-password" }
