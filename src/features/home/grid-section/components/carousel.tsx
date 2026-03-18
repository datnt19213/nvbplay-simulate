"use client";
import Image from "@/components/base-components/images/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";

const carouselData = [
  "/images/carousel_image1.png",
  "/images/carousel_image1.png",
  "/images/carousel_image1.png",
  "/images/carousel_image1.png",
];

const CarouselGrid = () => {
  const items = carouselData.map((item, index) => (
    <CarouselItem key={index}>
      <Image
        className="rounded-lg overflow-hidden h-[30rem] w-full desktop:w-[45rem]"
        src={item}
        alt=""
      />
    </CarouselItem>
  ));
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>{items}</CarouselContent>
      <CarouselDots className="absolute bottom-5 inset-x-0" />
    </Carousel>
  );
};

export default CarouselGrid;
