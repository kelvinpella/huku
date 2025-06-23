type Props = {
  children: React.ReactNode;
};
export default function AuthFormCard({ children }: Props) {
  return (
    <div className="customCard w-full md:w-2/3 md:mx-auto lg:mx-0 my-10 py-5 md:py-8 px-4 md:px-6 shadow-md">
      {children}
    </div>
  );
}
