import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import dynamic from "next/dynamic";
const FormFeatures = dynamic(() => import("@/features/home/form"));
/**
 * Props for `Forms`.
 */
export type FormsProps = SliceComponentProps<Content.FormsSlice>;

/**
 * Component for "Forms" Slices.
 */
const Forms = ({slice}: FormsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <FormFeatures slice={slice} />
    </section>
  );
};

export default Forms;
