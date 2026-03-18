import Image from "@/components/base-components/images/image";
import IconCustom from "@/components/common-components/icon-custom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { COMMON_DATA } from "@/configs";
import { FormatCurrency } from "@/utilities/text";
import { Heart } from "lucide-react";

const ProductCarousel = () => {
  const items = COMMON_DATA.product.map((item, index) => (
    <CarouselItem
      key={index}
      className="basis-1/2 md:basis-1/3 desktop:basis-1/5"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={item.image}
            className="aspect-square rounded-lg border-2 border-primary"
          />
          <div className="absolute top-0 inset-x-0 flex pt-3 px-4 items-center justify-between">
            <div className="w-[49px] h-[22px] bg-[#FFE880] p-0.5 rounded flex gap-0 items-center">
              <img
                src="/icons/flash.svg"
                className="size-[22px] -ml-2.5"
                loading="lazy"
                alt=""
              />
              <span className="text-sm -ml-2 font-medium text-[#E36301]">-31%</span>
            </div>
            <Button
              variant="ghost"
              className="size-[30px] p-0.5 rounded-full text-primary bg-[#F5F5FA]"
            >
              <IconCustom icon="tabler:heart" className="size-5 mt-0.5" />
            </Button>
          </div>
        </div>
        <div className="p-4 w-full flex flex-col justify-between items-start gap-3">
          <div className="flex flex-col gap-2">
            <h5 className="text-sm hover:text-primary cursor-pointer">
              {item.name}
            </h5>
            <div>
              <p className="text-base text-primary font-semibold">
                {FormatCurrency(item.price)}
              </p>
              <p className="text-xs text-muted-foreground line-through">
                {FormatCurrency(1900000)}
              </p>
            </div>
          </div>
          <Badge className="w-full font-normal text-center items-center gap-1 justify-center bg-[#D93843]">
            <img src="/icons/fire.svg" className="size-4" alt="" />
            Còn {item.amount} sản phẩm
          </Badge>
        </div>
      </div>
    </CarouselItem>
  ));
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>{items}</CarouselContent>
    </Carousel>
  );
};

export default ProductCarousel;
