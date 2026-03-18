"use client";

import { cn } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { useEffect } from "react";
import DealBanner from "./components/deal-banner";
import DealProducts from "./components/deal-products";
import TagBanner from "./components/tag-banner";
import { usePriceList } from "@/hooks/queries/price-list";
import { setActive, setPriceList } from "@/stores/datas/price-list";
import { useDispatch, useSelector } from "react-redux";
import { TagBannerSkeleton } from "./components/skeletons/tag-banner";
import { DealProductSkeleton } from "./components/skeletons/deal-product";
import { isAfter } from "date-fns";
import { RootState } from "@/stores";
import Bounded from "@/components/base-components/containers/bounded";

interface DealFeatuesType {
  slice: Content.DealsSliceDefault & { slice_type: string; variation: string };
}

const DealFeatures = ({ slice }: DealFeatuesType) => {
  const { data: priceList, isLoading, isSuccess } = usePriceList();
  const { active } = useSelector((state: RootState) => state.price_list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && priceList && priceList.length > 0) {
      dispatch(setPriceList(priceList));
      dispatch(setActive(priceList[0].id));
    }
  }, [isSuccess, priceList, dispatch]);

  // Điều kiện kiểm tra hiển thị loading skeleton
  if (isLoading) {
    return (
      <Bounded className={cn("relative flex flex-col rounded-lg bg-[#020203]")}>
        <TagBannerSkeleton />
        <DealBanner />

        <div className="p-0 desktop:p-2 bg">
          <DealProductSkeleton />
        </div>
      </Bounded>
    );
  }

  // Điều kiện kiểm tra và hiển thị nội dung khi có dữ liệu
  if (
    isSuccess &&
    priceList &&
    priceList.length > 0 &&
    priceList[0]?.prices?.length > 0
  ) {
    const deal = priceList.find(
      (item) =>
        item.id === active &&
        item.status === "active" &&
        isAfter(item.ends_at, new Date())
    );
    if (deal) {
      return (
        <Bounded
          data-slice-type={slice?.slice_type!}
          data-slice-variation={slice?.variation!}
          className="!px-0"
        >
          <div className={cn("relative flex flex-col rounded-lg bg-[#020203]")}>
            <TagBanner title={slice.primary.title} />
            <DealBanner />
            <div className="p-0 desktop:p-2 bg">
              <DealProducts />
            </div>
          </div>
        </Bounded>
      );
    }
  }

  // Trường hợp không có dữ liệu hoặc lỗi
  return null;
};

export default DealFeatures;
