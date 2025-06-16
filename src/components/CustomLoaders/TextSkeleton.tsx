import Skeleton, { SkeletonProps } from "react-loading-skeleton";

export default function TextSkeleton(props: SkeletonProps) {
    
  return <Skeleton  {...props} height={12}/>;
}
