import { Skeleton } from "@/components/ui/skeleton";

export const TabDealSkeleton = () => {
  return (
    <div className="px-0 desktop:px-4 flex items-center">
      {[1].map((_, index) => (
        <div
          key={index}
          className={
            "flex flex-col items-center justify-center gap-2 border-b px-2.5 mt-2 desktop:px-4 py-2 cursor-pointer border-b-primary bg-gradient-to-b from-[#FF3F1A]/0 to-[#FF3F1A]/20"
          }
        >
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-24 h-5" />
        </div>
      ))}
    </div>
  );
};
