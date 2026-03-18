import strokeStar from "@/assets/icons/stroke-star-bold.svg";
import Image from "next/image";
import ProductPagination from "../atom/product-pagination";
import ReviewItem from "./review-item";

const ReviewsList = () => {
  return (
    <div className="space-y-[32px]">
      <div className="overflow-auto">
        <div className="flex gap-[8px] text-[14px] leading-[21px]">
          <button
            style={{
              flex: "0 0 auto",
            }}
            className="px-[16px] py-[8px] rounded-full bg-[#27272a] text-white"
          >
            Tất cả
          </button>
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              style={{
                flex: "0 0 auto",
              }}
              className="px-[16px] py-[8px] rounded-full flex gap-[8px] items-center"
              key={index}
            >
              {index + 1}
              <Image src={strokeStar} alt="star" width={20} height={20} />
            </button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-[64px] gap-y-[40px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <ReviewItem key={index} />
        ))}
      </div>
      <ProductPagination />
    </div>
  );
};

export default ReviewsList;
