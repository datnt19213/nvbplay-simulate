import Heading from "@/components/base-components/typography/heading";
import CarouselOffer from "./components/carousel";
import {cn} from "@/lib/utils";
// import {FadeUpMotionLayout} from "@/layouts/component-layouts";

const OfferFeature = () => {
  return (
    // <FadeUpMotionLayout>
      <div className={cn("flex flex-col gap-4")}>
        <div className="flex items-center justify-between">
          <Heading>Sự kiện sắp tới</Heading>
          <p className="text-sm font-medium text-primary hover:text-primary/80">
            Xem tất cả
          </p>
        </div>
        <CarouselOffer />
      </div>
    // </FadeUpMotionLayout>
  );
};

export default OfferFeature;
