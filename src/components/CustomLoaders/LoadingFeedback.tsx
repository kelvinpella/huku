import { JSX } from "react";
import { ImSpinner8 } from "react-icons/im";

type Props = {
  message: string;
  errorMessage: string;
  loading: JSX.Element | boolean;
};

export default function LoadingFeedback({
  message,
  errorMessage,
  loading,
}: Props) {
  const loadingState =
    typeof loading === "boolean" ? (
      loading ? (
        <ImSpinner8 className="animate-spin" size={24} />
      ) : null
    ) : (
      loading
    );

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      {loadingState}
      {message && <p>{message}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
