import RegistrationWelcomeText from "./RegistrationWelcomeText";
import RegistrationMenu from "./RegistrationMenu";
import AuthSwitchButton from "../Buttons/AuthSwitchButton";
import OptionText from "../Banner/OptionText";

export default function LandingPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center lg:grid lg:grid-cols-2 grid-rows-1 lg:justify-start lg:gap-44">
      <RegistrationWelcomeText />
      <div className="w-full md:w-2/3 md:mx-auto lg:mx-0 my-10 px-2">
        <AuthSwitchButton title="Bofya hapa kama umejiunga tayari" url="/login" />
        <OptionText />
        <RegistrationMenu />
      </div>
    </div>
  );
}
