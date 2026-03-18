import Bounded from "@/components/base-components/containers/bounded";
import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import dynamic from "next/dynamic";
const CollectionFeature = dynamic(() => import("@/features/home/collection"));
/**
 * Props for `Collections`.
 */
export type CollectionsProps = SliceComponentProps<Content.CollectionsSlice>;

/**
 * Component for "Collections" Slices.
 */
const Collections = ({slice}: CollectionsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <CollectionFeature />
    </Bounded>
  );
};

export default Collections;
