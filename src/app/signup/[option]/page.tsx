import Signup from "@/components/Signup/Signup";
import { SignupOption, SignupOptionParam } from "../../../typings";

// return 404 if the signup option is not listed as expected param
export const dynamicParams = false;

export function generateStaticParams() {
  const signupOptions:SignupOption[] = ["phone", "email", "facebook", "google"];

  return signupOptions.map((option) => ({ option }));
}

export default function SignupPage({ params }: { params: SignupOptionParam }) {
  return <Signup signupOptionPromise={params} />;
}
