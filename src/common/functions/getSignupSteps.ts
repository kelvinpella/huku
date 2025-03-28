import { AuthFormField, SignupOption } from "../../typings";

type SignupSteps = AuthFormField["id"][][];

const getCredentialsProviderSteps = (
  dynamicField: Extract<AuthFormField["id"], "phone" | "email">
) => {
  const credentialsProviderSteps: SignupSteps = [
    [dynamicField],
    ["firstname", "lastname"],
    ["password", "confirmPassword"],
    ["location"],
  ];

  return credentialsProviderSteps;
};
/**
 * Show a select number of form inputs at each step of signup
 * @param signupOption - signup option selected
 */
export const getSignupSteps = (signupOption: SignupOption) => {
  const oAuthProviderSteps: SignupSteps = [["location"]];

  // map the selected signup option to a list of steps which are associated with input ids to show
  const signupOptionToStepsMap: Record<SignupOption, () => SignupSteps> = {
    phone: () => getCredentialsProviderSteps("phone"),
    email: () => getCredentialsProviderSteps("email"),
    facebook: () => oAuthProviderSteps,
    google: () => oAuthProviderSteps,
  };

  const signupSteps = signupOptionToStepsMap[signupOption]();

  return signupSteps;
};
