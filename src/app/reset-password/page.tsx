import ResetPassword from "@/components/ResetPassword/ResetPassword";

// Override Build Error: This page is dynamic and cannot be statically generated.
// TODO: Remove this when the issue is resolved in Next.js
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function ResetPasswordPage() {
  //TODO check access token before showing showing the form
  // or redirect to login page

  return <ResetPassword />;
}
