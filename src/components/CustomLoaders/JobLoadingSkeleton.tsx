import TextSkeleton from "./TextSkeleton";

export default function JobLoadingSkeleton() {
  return (
    <div className="w-full py-1.5 px-2 rounded-md border border-gray-500/10 bg-gray-100">
      <TextSkeleton className="!w-8/12" />
      <TextSkeleton count={3} />
    </div>
  );
}
