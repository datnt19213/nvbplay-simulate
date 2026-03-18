import {Content} from "@prismicio/client";
import LiveCarousel from "./components/live-carousel";
import Heading from "@/components/base-components/typography/heading";
import {cn} from "@/lib/utils";
// import {FadeUpMotionLayout} from "@/layouts/component-layouts";

interface LiveFeatureType {
  slice: Content.LivestreamsSlice;
}
const LiveFeature = ({slice}: LiveFeatureType) => {
  return (
    // <FadeUpMotionLayout>
      <div className={cn("flex flex-col gap-4")}>
        <div className="flex items-center justify-between">
          <Heading>Phiên live nổi bật</Heading>
          <p className="text-sm font-medium text-primary hover:text-primary/80">
            Xem tất cả
          </p>
        </div>
        <LiveCarousel />
      </div>
    // </FadeUpMotionLayout>
  );
};

export default LiveFeature;
