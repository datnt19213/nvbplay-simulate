import Bounded from "@/components/base-components/containers/bounded";
import { Skeleton } from "@/components/ui/skeleton";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

const CategoriesFeature = dynamic(() => import("@/features/home/categories"), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
/**
 * Props for `Categories`.
 */
export type CategoriesProps = SliceComponentProps<Content.CategoriesSlice>;

/**
 * Component for "Categories" Slices.
 */
const Categories = ({ slice }: CategoriesProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <CategoriesFeature slice={slice} />
    </Bounded>
  );
};

export default Categories;
