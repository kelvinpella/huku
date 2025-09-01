import CustomLink from "@/components/Buttons/CustomLink";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="w-full mt-4 text-lg text-center">
        Please check the URL or return to the homepage.
      </p>
      <CustomLink className="my-6" href="/">
        Return Home
      </CustomLink>
    </div>
  );
}
