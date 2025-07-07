import PostJob from "@/components/PostJob/PostJob";
type Params = {
  params: Promise<{
    pageParams: string[] | undefined;
  }>;
};
export default function PostJobPage({ params }: Params) {
  return (
    <div className="w-full lg:max-w-screen-lg mx-auto px-2 py-6 my-12">
      <PostJob pageParamsPromise={params} />
    </div>
  );
}
