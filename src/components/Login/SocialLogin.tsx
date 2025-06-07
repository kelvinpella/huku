import { getAuthOptions } from "@/common/functions/getAuthOptions";
import AuthLoginOptionsWrapper from "./AuthLoginOptionsWrapper";
import { AuthOption } from "@/typings";
import OptionText from "../Banner/OptionText";
import { signInWithSocialProvider } from "@/common/functions/signInWithSocialProvider";

export default function SocialLogin() {
  const socialLogins = getAuthOptions({
    // facebook: "Endelea na Facebook",
    google: "Endelea na Google",
  });

  const buttonClickHandler = (optionValue: AuthOption) => {
    signInWithSocialProvider(
      optionValue as Extract<AuthOption, "facebook" | "google">
    );
  };
  return (
    <div className="w-full my-4">
      <AuthLoginOptionsWrapper
        options={socialLogins}
        buttonClickHandler={buttonClickHandler}
      />
      <OptionText />
    </div>
  );
}
