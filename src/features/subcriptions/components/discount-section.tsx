import Image from "@/components/base-components/images/image";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const discounts = [
  {
    title: "Ưu đãi từ các nhãn hàng",
    image: "/images/discount1.png",
    description: "Ưu đãi từ các nhãn hàng",
  },
  {
    title: "Ưu đãi từ các nhãn hàng",
    image: "/images/discount2.png",
    description: "Ưu đãi từ các nhãn hàng",
  },
  {
    title: "Ưu đãi từ các nhãn hàng",
    image: "/images/discount2.png",
    description: "Ưu đãi từ các nhãn hàng",
  },
  {
    title: "Ưu đãi từ các nhãn hàng",
    image: "/images/discount2.png",
    description: "Ưu đãi từ các nhãn hàng",
  },
];
const DiscountSection = () => {
  const items = discounts.map((discount, index) => (
    <CarouselItem key={index} className="basis-3/5 desktop:basis-2/5">
      <Image
        src={discount.image}
        className="h-[180px] rounded-lg overflow-hidden"
      />
    </CarouselItem>
  ));
  return (
    <div className="p-6 gap-6 rounded-lg bg-white flex flex-col">
      <h2 className="text-xl font-semibold text-center">
        Ưu đãi từ các nhãn hàng
      </h2>
      <Carousel>
        <CarouselContent>{items}</CarouselContent>
        <div className="hidden desktop:block">
          <CarouselPrevious className="-left-4" />
        </div>
        <div className="hidden desktop:block">
          <CarouselNext className="-right-4" />
        </div>
        <div className="hidden desktop:inline-flex">
          <CarouselDots
            className="absolute inset-x-0 -bottom-0"
            dotActiveClassName="bg-gray-700"
            dotClassName="bg-gray-300"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default DiscountSection;
