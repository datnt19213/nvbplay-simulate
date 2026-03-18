import { Content } from "@prismicio/client";
import dynamic from "next/dynamic";
import SearchSection from "./components/search";
import Heading from "@/components/base-components/typography/heading";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
const CategoriesCarousel = dynamic(() => import("./components/carousel"));
interface CategoriesFeatureType {
  slice: Content.CategoriesSliceDefault;
}
const CategoriesFeature = ({ slice }: CategoriesFeatureType) => {
  return (
    <div className={cn("flex flex-col gap-8")}>
      <SearchSection />

      <div className={cn("flex flex-col gap-4")}>
        <Heading>{slice.primary.title}</Heading>
        <CategoriesCarousel />
      </div>
    </div>
  );
};

export default CategoriesFeature;
