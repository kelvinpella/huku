type Props = {
  message: string;
  errorMessage: string;
};

export default function ErrorMessage({ message, errorMessage }: Props) {
  return (
    <div>
      {message && <p className="text-red-500">{message}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
