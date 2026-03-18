import Bounded from "@/components/base-components/containers/bounded";
import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import dynamic from "next/dynamic";
const MembershipFeature = dynamic(() => import("@/features/home/membership"));
/**
 * Props for `Memberships`.
 */
export type MembershipsProps = SliceComponentProps<Content.MembershipsSlice>;

/**
 * Component for "Memberships" Slices.
 */
const Memberships = ({slice}: MembershipsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <MembershipFeature />
    </Bounded>
  );
};

export default Memberships;
