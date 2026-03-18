import Bounded from "@/components/base-components/containers/bounded";
import { Skeleton } from "@/components/ui/skeleton";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

const GridSectionContainer = dynamic(
  () => import("@/features/home/grid-section"),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);
/**
 * Props for `GridSections`.
 */
export type GridSectionsProps = SliceComponentProps<Content.GridSectionsSlice>;

/**
 * Component for "GridSections" Slices.
 */
const GridSections = ({ slice }: GridSectionsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <GridSectionContainer slice={slice} />
    </Bounded>
  );
};

export default GridSections;
