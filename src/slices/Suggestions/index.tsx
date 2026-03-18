import Bounded from "@/components/base-components/containers/bounded";
import {useWindowSize} from "@/hooks";
import {RootState} from "@/stores";
import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import dynamic from "next/dynamic";
import {useDispatch, useSelector} from "react-redux";
const SuggestionFeature = dynamic(() => import("@/features/home/suggestion"));
/**
 * Props for `Suggestions`.
 */
export type SuggestionsProps = SliceComponentProps<Content.SuggestionsSlice>;

/**
 * Component for "Suggestions" Slices.
 */
const Suggestions = ({slice}: SuggestionsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0 flex flex-col gap-4"
    >
      <SuggestionFeature />
    </Bounded>
  );
};

export default Suggestions;
