
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

const DealFeatures = dynamic(() => import("@/features/home/deals"));
/**
 * Props for `Deals`.
 */
export type DealsProps = SliceComponentProps<Content.DealsSlice>;

/**
 * Component for "Deals" Slices.
 */
const Deals = ({ slice }: DealsProps): JSX.Element => {
  return (
    <>
      <DealFeatures slice={slice} />
    </>
  );
};

export default Deals;
