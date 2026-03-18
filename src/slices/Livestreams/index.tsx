import Bounded from "@/components/base-components/containers/bounded";
import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import dynamic from "next/dynamic";
const LiveStreamFeature = dynamic(() => import("@/features/home/live"));
/**
 * Props for `Livestreams`.
 */
export type LivestreamsProps = SliceComponentProps<Content.LivestreamsSlice>;

/**
 * Component for "Livestreams" Slices.
 */
const Livestreams = ({slice}: LivestreamsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <LiveStreamFeature slice={slice} />
    </Bounded>
  );
};

export default Livestreams;
