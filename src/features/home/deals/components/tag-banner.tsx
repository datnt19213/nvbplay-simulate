import { flash, tag_deal } from "@/assets/images";
import Image from "@/components/base-components/images/image";
import { RootState } from "@/stores";
import { KeyTextField } from "@prismicio/client";
import { formatDate } from "date-fns";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const TagBanner = ({ title }: { title: KeyTextField }) => {
  const { priceList, active } = useSelector(
    (state: RootState) => state.price_list
  );

  const timeRange = useMemo(() => {
    const price = priceList?.find((item) => item.id === active);
    return `${formatDate(price?.starts_at || new Date(), "dd/MM/yyyy")} - ${formatDate(price?.ends_at || new Date(), "dd/MM/yyyy")}`;
  }, [priceList, active]);

  return (
    <div className="absolute -top-1 desktop:-top-1.5 w-full flex flex-col items-center">
      <div className="relative">
        <Image src={tag_deal.src} className="desktop:w-[448px] desktop:z-[1]" />
        <div className="absolute w-full inset-0 flex justify-center items-center gap-2">
          <p className="hidden desktop:block text-white text-base uppercase font-bold desktop:z-[1]">
            {/* {title} */}
            Giờ vàng giá sốc
          </p>
          <div className="flex items-center">
            <img
              src={flash.src}
              className="z-0 desktop:z-[10] -mr-3.5 size-7"
            />
            <div className="desktop:z-[1] bg-gradient-to-r from-[#F5ED90] via-[#FFF0DD] to-[#FFDD97] pl-5 p-0.5 rounded-e-full">
              <p className="text-xs bg-gradient-to-r from-[#1B212B] via-[#1C222D] to-[#0F1114] py-0.5 -ml-3 px-2 rounded-e-full text-[9px] font-semibold text-[#FCFBBA]">
                {timeRange}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagBanner;
