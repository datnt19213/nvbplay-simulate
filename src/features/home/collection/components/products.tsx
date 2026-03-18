import ProductCard from "@/components/base-components/cards/product-card2";
import Heading from "@/components/base-components/typography/heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { COMMON_DATA } from "@/configs";

const ProductCollection = () => {
  const items = COMMON_DATA.product.slice(0, 5).map((item, index) => (
    <CarouselItem key={index} className="basis-2/3 desktop:basis-1/3 desktop:max-w-[320px]">
      <ProductCard withBoder {...item} />
    </CarouselItem>
  ));
  return (
    <div className="flex flex-col h-full gap-5 py-5 px-4 mx-0 bg-white rounded-lg">
      <Heading>Chinh phục vô địch</Heading>
      <Carousel>
        <CarouselContent className="w-full">{items}</CarouselContent>
        <CarouselPrevious className="-left-4 text-primary hidden desktop:inline-flex" />
        <CarouselNext className="-right-4 text-primary hidden desktop:inline-flex" />
      </Carousel>
    </div>
  );
};

export default ProductCollection;
