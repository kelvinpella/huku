import JobLoadingSkeleton from "./JobLoadingSkeleton";

export default function JobsLoadingSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      {Array(10)
        .fill(Boolean)
        .map((_, index) => (
          <JobLoadingSkeleton key={index} />
        ))}
    </div>
  );
}
