import { getAuthOptions } from "@/common/functions/getAuthOptions";
import AuthLoginOptionsWrapper from "./AuthLoginOptionsWrapper";
import { AuthOption } from "@/typings";
import OptionText from "../Banner/OptionText";

export default function SocialLogin() {
  const socialLogins = getAuthOptions({
    // facebook: "Endelea na Facebook",
    google: "Endelea na Google",
  });

  const buttonClickHandler = (optionValue: AuthOption) => {
    console.log(optionValue);
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
