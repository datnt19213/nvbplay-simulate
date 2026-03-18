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
    name: "Giảm đến 30% khi đặt sân thông qua NVB Play",
    image: "/images/offer1.png",
  },
  {
    id: 2,
    name: "Siêu sale đầu tuần - Giảm đến 50% sản phẩm toàn sàn ",
    image: "/images/offer2.png",
  },
  {
    id: 3,
    name: "Siêu sale đầu tuần - Giảm đến 50% sản phẩm toàn sàn ",
    image: "/images/offer3.png",
  },
  {
    id: 4,
    name: "Siêu sale đầu tuần - Giảm đến 50% sản phẩm toàn sàn ",
    image: "/images/offer4.png",
  },
  {
    id: 5,
    name: "Siêu sale đầu tuần - Giảm đến 50% sản phẩm toàn sàn ",
    image: "/images/offer5.png",
  },
  {
    id: 6,
    name: "Siêu sale đầu tuần - Giảm đến 50% sản phẩm toàn sàn ",
    image: "/images/offer1.png",
  },
];
const CarouselOffer = () => {
  const items = offers.map((offer) => (
    <CarouselItem key={offer.id} className="basis-1/2 desktop:basis-1/5">
      <div className="flex flex-col  items-start justify-start gap-2">
        <Image src={offer.image} />
        <p className="text-sm font-medium">{offer.name}</p>
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

export default CarouselOffer;
