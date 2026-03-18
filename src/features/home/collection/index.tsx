import Heading from "@/components/base-components/typography/heading";
import CarouselCollection from "./components/carousel";
import ImageCollection from "./components/images";
import ProductCollection from "./components/products";
import { cn } from "@/lib/utils";
// import { FadeUpMotionLayout } from "@/layouts/component-layouts";

const CollectionFeature = () => {
  return (
    // <FadeUpMotionLayout>
      <div className={cn("flex flex-col gap-8")}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Heading>Bộ sưu tập</Heading>
            <p className="text-sm font-medium text-primary hover:text-primary/80">
              Xem tất cả
            </p>
          </div>
          <CarouselCollection />
        </div>
        <div className="flex flex-col gap-4 desktop:flex-row w-full">
          <div className="w-full desktop:w-[437px]">
            <ImageCollection />
          </div>

          <div className="desktop:w-[750px]">
            <ProductCollection />
          </div>
        </div>
      </div>
    // </FadeUpMotionLayout>
  );
};

export default CollectionFeature;
