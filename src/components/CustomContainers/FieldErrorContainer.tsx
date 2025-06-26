import clsx from "clsx";

type Props = {
  errorMessage: string | undefined;
};
export default function FieldErrorContainer({ errorMessage }: Props) {
  return (
    <div
      id="field-error-container"
      className={clsx(
        "text-sm w-full text-red-500 h-5",
        !errorMessage && "invisible"
      )}
    >
      {errorMessage}
    </div>
  );
}
