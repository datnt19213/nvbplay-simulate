import Countdown from "@/components/base-components/counter/date";
import { RootState } from "@/stores";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ProductCarousel from "./product-carousel";
import TabDeal from "./tab";
import { FadeUpMotionLayout } from "@/layouts/component-layouts";
import { isAfter } from "date-fns";

const DealProducts = () => {
  const { priceList, active } = useSelector(
    (state: RootState) => state.price_list
  );

  const deal = useMemo(() => {
    return (
      priceList &&
      priceList.length > 0 &&
      priceList.find(
        (item) =>
          item.id === active &&
          item.status === "active" &&
          isAfter(item.ends_at, new Date())
      )
    );
  }, [priceList, active]);

  return (
    <div className="flex flex-col rounded-lg bg-white">
      <div className="flex justify-between gap-0 items-center mb-4 border-b border-b-gray-100">
        {/* TAB */}
        <div className="pl-4 w-full">
          <TabDeal />
        </div>
        {/* COUNT DOWN */}
        {deal && (
          <FadeUpMotionLayout>
            <Countdown targetDate={deal?.ends_at || new Date().toISOString()} />
          </FadeUpMotionLayout>
        )}
      </div>
      <div className="px-4">
        {/* PRODUCT LIST */}
        <ProductCarousel />
      </div>
    </div>
  );
};

export default DealProducts;
