import Bounded from "@/components/base-components/containers/bounded";
import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import dynamic from "next/dynamic";

const ProductFeature = dynamic(() => import("@/features/home/products"));
/**
 * Props for `Products`.
 */
export type ProductsProps = SliceComponentProps<Content.ProductsSlice>;

/**
 * Component for "Products" Slices.
 */
const Products = ({slice}: ProductsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <ProductFeature slice={slice} />
    </Bounded>
  );
};

export default Products;
