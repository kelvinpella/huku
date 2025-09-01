import Jobs from "@/components/Jobs/Jobs";
// Override Build Error: This page is dynamic and cannot be statically generated.
// TODO: Remove this when the issue is resolved in Next.js
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function JobsPage() {
  return (
    <div className="w-full lg:max-w-screen-lg mx-auto px-2 py-6 my-12">
      <Jobs pageTitle="Posted Jobs" />
    </div>
  );
}

