import AuthLoginOptionsWrapper from "./AuthLoginOptionsWrapper";
import { AuthOption, CustomMenuItem } from "@/typings";
import OptionText from "../Banner/OptionText";
import { signInWithSocialProvider } from "@/common/functions/signInWithSocialProvider";
import { getMenuItems } from "@/common/functions/getMenuItems";

export default function SocialLogin() {
  const loginMethods = getMenuItems("login");

  const socialLogins = loginMethods.filter(({ id }) => id === "google");

  const buttonClickHandler = (provider: CustomMenuItem["action"]) => {
    signInWithSocialProvider(
      provider as Extract<AuthOption, "facebook" | "google">
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
