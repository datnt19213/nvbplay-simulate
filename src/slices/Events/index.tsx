import Bounded from "@/components/base-components/containers/bounded";
import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import dynamic from "next/dynamic";
const EventFeature = dynamic(() => import("@/features/home/event"));
/**
 * Props for `Events`.
 */
export type EventsProps = SliceComponentProps<Content.EventsSlice>;

/**
 * Component for "Events" Slices.
 */
const Events = ({slice}: EventsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <EventFeature />
    </Bounded>
  );
};

export default Events;
