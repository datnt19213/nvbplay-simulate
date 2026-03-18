import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Example`.
 */
export type ExampleProps = SliceComponentProps<Content.ExampleSlice>;

/**
 * Component for "Example" Slices.
 */
const Example = ({ slice }: ExampleProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for example (variation: {slice.variation}) Slices
    </section>
  );
};

export default Example;
