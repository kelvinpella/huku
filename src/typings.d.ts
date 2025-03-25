
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
export type AuthFormField = Record<"name" | "id" | "label" | "placeholder" | "type", string>
