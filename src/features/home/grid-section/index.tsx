import { cn } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import dynamic from "next/dynamic";
const Carousel = dynamic(() => import("./components/carousel"));
type GridSectionProps = {
  slice: Content.GridSectionsSlice;
};
const GridSectionContainer = ({ slice }: GridSectionProps) => {
  return (
    <>
      {slice.variation === "default" && (
        <div
          className={cn(
            "flex flex-col desktop:flex-row gap-4 desktop:h-[30rem]"
          )}
        >
          <div className="w-full desktop:w-[45rem]">
            <Carousel />
          </div>

          <div className="w-full desktop:w-[28.75rem] h-full">
            <div className="grid grid-cols-1 gap-4 h-full">
              {slice.primary.images.map((image, index) => (
                <PrismicNextImage
                  key={index}
                  field={image.image}
                  alt=""
                  className="w-full h-full"
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {slice.variation === "gridSection2" && (
        <div className={cn("grid grid-cols-1 desktop:grid-cols-2 gap-4")}>
          {slice.primary.images.map((image, index) => (
            <div key={index} className="desktop:max-h-[18.5rem]">
              <PrismicNextImage
                field={image.image}
                className="w-full h-full rounded-lg"
                alt=""
              />
            </div>
          ))}
        </div>
      )}
      {slice.variation === "gridSection3" && (
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4")}>
          <div className="">
            <PrismicNextImage
              field={slice.primary.images[0]?.image}
              className="w-full h-full object-cover rounded-lg"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-4">
            <PrismicNextImage
              field={slice.primary.images[1]?.image}
              className="w-full h-full object-cover rounded-lg"
              alt=""
            />
            <PrismicNextImage
              field={slice.primary.images[2]?.image}
              className="w-full h-full object-cover rounded-lg"
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GridSectionContainer;
