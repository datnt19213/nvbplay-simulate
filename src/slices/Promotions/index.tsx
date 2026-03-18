import Bounded from "@/components/base-components/containers/bounded";
import {Content} from "@prismicio/client";
import {PrismicNextImage} from "@prismicio/next";
import {SliceComponentProps} from "@prismicio/react";

/**
 * Props for `Promotions`.
 */
export type PromotionsProps = SliceComponentProps<Content.PromotionsSlice>;

/**
 * Component for "Promotions" Slices.
 */
const Promotions = ({slice}: PromotionsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative h-[12rem] desktop:h-auto !px-0"
    >
      <PrismicNextImage
        field={slice.primary.background_image}
        className="w-full h-full rounded-lg object-cover overflow-hidden"
        alt=""
      />
      <div className="absolute inset-0 h-full w-full">
        <div className="h-full flex flex-col items-center justify-center gap-1 text-white">
          <h2 className="text-[32px] font-semibold uppercase">
            {slice.primary.title}
          </h2>
          <p className="text-base uppercase font-normal">
            {slice.primary.short_description}
          </p>
        </div>
      </div>
    </Bounded>
  );
};

export default Promotions;
