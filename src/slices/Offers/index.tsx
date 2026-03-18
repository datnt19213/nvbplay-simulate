import Bounded from "@/components/base-components/containers/bounded";
import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import dynamic from "next/dynamic";
const OfferFeatures = dynamic(() => import("@/features/home/offer"));
/**
 * Props for `Offers`.
 */
export type OffersProps = SliceComponentProps<Content.OffersSlice>;

/**
 * Component for "Offers" Slices.
 */
const Offers = ({slice}: OffersProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <OfferFeatures />
    </Bounded>
  );
};

export default Offers;
