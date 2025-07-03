"use client";
import CustomMenu from "../Menu/CustomMenu";
import { AuthOption, CustomMenuItem } from "@/typings";
import { signInWithSocialProvider } from "@/common/functions/signInWithSocialProvider";
 

export default function SignupMenu() { 
  const handleSocialLogin = (provider: CustomMenuItem["action"]) => {
    signInWithSocialProvider(
      provider as Extract<AuthOption, "facebook" | "google">
    );
  };

  return (
    <div className="w-full py-5">
      <CustomMenu
        componentName={"signup"}
        buttonClickHandler={handleSocialLogin}
        openByDefault
      />
    </div>
  );
}
