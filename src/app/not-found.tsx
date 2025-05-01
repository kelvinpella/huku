import CustomLink from "@/components/Buttons/CustomLink";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Ukurasa Haupo</h1>
      <p className="w-full mt-4 text-lg text-center">
        Tafadhali angalia URL au rudi kwenye ukurasa wa nyumbani.
      </p>
      <CustomLink className="my-6" href="/">
        Rudi Nyumbani
      </CustomLink>
    </div>
  );
}
