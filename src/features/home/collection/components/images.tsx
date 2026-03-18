import Image from "@/components/base-components/images/image";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const banners = [
  "/images/banner-collection.png",
  "/images/banner-collection.png",
  "/images/banner-collection.png",
];
const ImageCollection = () => {
  const items = banners.map((banner, index) => (
    <CarouselItem key={index}>
      <div className="flex flex-col items-start justify-start gap-2 relative w-full desktop:w-[437px]">
        <Image src={banner} className="rounded-lg overflow-hidden w-full h-full object-cover" />
        <div className="absolute bottom-5 w-full flex flex-col gap-1 p-5 text-white">
          <h3 className="text-2xl leading-snug tracking-wide font-medium">
            BANNER TITLE EMBRACING CHALLENGES
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-sm">Khám phá ngay</p>
            <ArrowRight className="size-5" />
          </div>
        </div>
      </div>
    </CarouselItem>
  ));
  return (
    <Carousel>
      <CarouselContent>{items}</CarouselContent>
      <CarouselDots className="absolute  inset-x-0 bottom-3" />
    </Carousel>
  );
};

export default ImageCollection;
