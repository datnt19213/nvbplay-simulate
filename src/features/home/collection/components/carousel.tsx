import Image from "@/components/base-components/images/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const offers = [
  {
    id: 1,
    image: "/images/collection1.png",
  },
  {
    id: 2,

    image: "/images/collection2.png",
  },
  {
    id: 3,
    image: "/images/collection3.png",
  },
];
const CarouselCollection = () => {
  const items = offers.map((offer) => (
    <CarouselItem key={offer.id} className="basis-4/5 desktop:basis-2/5">
      <div className="flex flex-col  items-start justify-start gap-2">
        <Image src={offer.image} className="rounded-lg overflow-hidden" />
      </div>
    </CarouselItem>
  ));
  return (
    <Carousel>
      <CarouselContent>{items}</CarouselContent>
      <CarouselPrevious className="-left-4 text-primary" />
      <CarouselNext className="-right-4 text-primary" />
    </Carousel>
  );
};

export default CarouselCollection;
