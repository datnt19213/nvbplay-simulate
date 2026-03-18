"use client";
import { MainContent } from "./components/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import Skeletons from "@/components/custom/skeletons";
import { useGhostPostDetail } from "@/hooks/queries/ghost/use-get-post-detail";

export const BlogDetailFeature = ({ slug }: { slug: string }) => {
  const { data, isLoading, isSuccess } = useGhostPostDetail(slug);

  return (
    <div className="container px-3 md:px-0 overflow-hidden my-6">
      {isLoading ? (
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <Skeletons direction="column" className="bg-gray-50">
              <Skeleton className="w-full h-20" />
              <Skeleton className="w-full h-40" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-40" />
              <Skeleton className="w-full h-96" />
              <Skeleton className="w-full h-40" />
            </Skeletons>
          </div>
          <div className="hidden md:block col-span-12 md:col-span-4">
            <Skeletons direction="column" className="bg-gray-50">
              <Skeleton className="w-full h-20" />
              <Skeleton className="w-full h-40" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-40" />
              <Skeleton className="w-full h-40" />
            </Skeletons>
          </div>
        </div>
      ) : (
        isSuccess && data && <MainContent blogDetail={data} />
      )}
    </div>
  );
};
