import { AuthForm, AuthOption, SignupStep } from "../../typings";

const getCredentialsProviderSteps = (
  dynamicField: Extract<keyof AuthForm, "phone" | "email">
) => {
  const credentialsProviderSteps: SignupStep[] = [
    { stepName: "step 1", fields: [dynamicField] },
    { stepName: "step 2", fields: ["password"] },
    { stepName: "step 3", fields: ["firstname", "lastname"] },
    { stepName: "step 4", fields: ["location"] },
  ];

  return credentialsProviderSteps;
};
/**
 * Show a select number of form inputs at each step of signup
 * @param signupOption - signup option selected
 */
export const getSignupSteps = (signupOption: AuthOption) => {
  const oAuthProviderSteps: SignupStep[] = [
    { stepName: "step 1", fields: ["location"] },
  ];

  // map the selected signup option to a list of steps which are associated with input ids to show
  const signupOptionToSteps: Record<AuthOption, () => SignupStep[]> = {
    phone: () => getCredentialsProviderSteps("phone"),
    email: () => getCredentialsProviderSteps("email"),
    facebook: () => oAuthProviderSteps,
    google: () => oAuthProviderSteps,
  };

  const signupSteps = signupOptionToSteps[signupOption]();

  return signupSteps;
};
