import { BasicUserForm } from "@/typings";

/**
 * Initial signup form state
 */
export const signupFormInitialState: BasicUserForm = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  location: "",
  passwords: {
    password: "",
    confirmPassword: "",
  },
};
