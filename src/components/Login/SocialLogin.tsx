import { getAuthOptions } from "@/common/functions/getAuthOptions";
import AuthLoginOptionsWrapper from "./AuthLoginOptionsWrapper";
import { AuthOption } from "@/typings";

export default function SocialLogin() {
  const socialLogins = getAuthOptions({
    facebook: "Endelea na Facebook",
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
      <div className="w-full flex items-center justify-center gap-8 my-4 py-2 px-6">
        <hr className="w-full border border-gray-500" />
        <span className="text-black uppercase text-sm">au</span>
        <hr className="w-full border border-gray-500" />
      </div>
    </div>
  );
}
