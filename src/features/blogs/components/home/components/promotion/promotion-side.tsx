import Image from "@/components/base-components/images/image";
import { BestSeller } from "./best-seller";
import { HotCategory } from "./hot-category";
import { PopularTag } from "./popular-tag";
import { Promotion } from "./promotion";

export const PromotionSide = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full max-h-[12.5rem] rounded-lg overflow-hidden">
        <Image
          src="/images/blog/home/right-side-1.png"
          alt=""
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      {/* POPULAR TAG */}
      <PopularTag />

      {/* Promotion */}
      <Promotion
        image="/images/blog/home/pickleball.png"
        className="max-h-[11.25rem]"
      />
      <Promotion image="/images/blog/home/badminton.png" />

      {/* Hot Category */}
      <HotCategory />

      <Promotion image="/images/blog/home/badminton-2.png" />

      {/* Best Sell */}
      <BestSeller />
    </div>
  );
};
