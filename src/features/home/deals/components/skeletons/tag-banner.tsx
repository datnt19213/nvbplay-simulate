import { flash, tag_deal } from "@/assets/images";
import Image from "@/components/base-components/images/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const TagBannerSkeleton = () => {
  return (
    <div className={cn("relative flex flex-col rounded-lg bg-[#020203]")}>
      <div className="absolute -top-1 desktop:-top-1.5 w-full flex flex-col items-center">
        <div className="relative">
          <Image
            src={tag_deal.src}
            className="desktop:w-[448px] desktop:z-[1]"
          />
          <div className="absolute w-full inset-0 flex justify-center items-center gap-2">
            <p className="hidden desktop:block text-white text-sm uppercase font-semibold desktop:z-[1]">
              Deal cực sốc
            </p>
            <div className="flex items-center">
              <img
                src={flash.src}
                className="z-0 desktop:z-[10] -mr-3.5 size-7"
              />
              <div className="desktop:z-[1] bg-gradient-to-r from-[#F5ED90] via-[#FFF0DD] to-[#FFDD97] pl-5 p-0.5 rounded-e-full">
                <Skeleton className="w-48 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
