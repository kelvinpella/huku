import Signup from "@/components/Signup/Signup";
import { AuthPageParam, AuthOption } from "../../../typings";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// return 404 if the signup option is not listed as expected param
export const dynamicParams = false;

export function generateStaticParams() {
  const signupOptions: AuthOption[] = [
    "phone",
    "email",
    // "facebook",
    "google",
  ];

  return signupOptions.map((option) => ({ option }));
}

export default function SignupPage({
  params,
}: {
  params: AuthPageParam<"signup">;
}) {
  return <Signup signupOptionPromise={params} />;
}
