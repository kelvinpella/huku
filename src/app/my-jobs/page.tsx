import Jobs from "@/components/Jobs/Jobs";
// Override Build Error: This page is dynamic and cannot be statically generated.
// TODO: Remove this when the issue is resolved in Next.js
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function MyJobsPage() {
  return (
    <div className="w-full"> 
      <Jobs pageTitle="Jobs you posted" />
    </div>
  );
}
