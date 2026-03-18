import Image from "@/components/base-components/images/image";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BestSellCard = () => {
  return (
    <div
      className={cn(
        "border border-neutral-200 flex flex-col items-center bg-white rounded-lg"
      )}
    >
      <div className="w-full">
        <div className="w-full h-[10rem] aspect-square rounded-lg overflow-hidden border bor-neutral-200 flex justify-center items-center">
          <Image
            src={"/images/blog/home/racket.png"}
            className="w-auto h-full"
            loading="lazy"
          />
        </div>
        <div className="absolute top-0 inset-x-0 flex pt-3 px-4 items-center justify-between">
          <div className="w-[49px] h-[22px] bg-[#FFE880] p-0.5 rounded flex gap-0 items-center">
            <img
              src="/icons/flash.svg"
              className="size-[22px] -ml-2.5"
              loading="lazy"
              alt=""
            />
            <span className="text-sm -ml-2 font-medium text-[#E36301]">
              -31%
            </span>
          </div>
          <Button
            variant="ghost"
            className="size-[30px] p-0.5 rounded-full text-primary bg-[#F5F5FA]"
          >
            <IconCustom icon="tabler:heart" className="size-5 mt-0.5" />
          </Button>
        </div>
      </div>
      <div className="p-4 w-full flex flex-col justify-between items-start gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1.5">
            <h5 className="text-xs desktop:text-sm hover:text-primary cursor-pointer line-clamp-2">
              VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)
            </h5>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base text-primary font-bold">1.350.000 đ</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold">
                1.900.000 đ
              </span>
              <div className="relative bg-[#FFE880] rounded-md p-[2px] flex items-center gap-0">
                <Image
                  src={"/images/blog/home/icon.png"}
                  className="size-5 object-cover absolute top-0 -left-2"
                  loading="lazy"
                />
                <div className="text-xs text-[#E36301] font-semibold ml-1">
                  -31%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
