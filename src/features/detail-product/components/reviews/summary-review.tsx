import product from "@/assets/images/product-item.jpg";
import RatingStar from "@/components/ui/rating-star";
import Image from "next/image";
import Heading from "../atom/heading";

const items = [
  {
    star: 5,
    amount: 10,
  },
  {
    star: 4,
    amount: 10,
  },
  {
    star: 3,
    amount: 10,
  },
  {
    star: 2,
    amount: 10,
  },
  {
    star: 1,
    amount: 10,
  },
];

const SummaryReview = () => {
  return (
    <div className="flex flex-col md:flex-row md:gap-[128px] gap-[40px] ">
      <div className="space-y-[24px] md:min-w-[344px] md:max-w-[344px] w-full">
        <div className="">
          <Heading title="Tổng quan" variant="secondary" />
          <div className="flex gap-[12px] items-center">
            <span className="text-[48px] leading-[72px] font-[600] text-[#27272a]">
              4.0
            </span>
            <div className="translate-y-[7px]">
              <RatingStar
                className="gap-[4px]"
                width={26}
                height={26}
                amount={4}
                total={5}
              />
            </div>
          </div>
          <span className="text-[#515158]">12 Đánh giá</span>
        </div>
        <div className="space-y-[12px] w-full">
          {items.map((i) => (
            <div className="flex gap-[12px] justify-between" key={i.star}>
              <RatingStar amount={i.star} total={5} />
              <span className="text-[#38383d]">{i.amount} đánh giá</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full space-y-[16px]">
        <Heading title="Đánh giá bằng hình ảnh (20)" variant="secondary" />
        <div className="flex flex-wrap gap-[12px]">
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                className="size-[80px] relative rounded-[8px] overflow-hidden"
              >
                <Image
                  src={product}
                  fill
                  alt="product"
                  className="object-cover"
                />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryReview;
