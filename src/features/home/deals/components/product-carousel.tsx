import Image from "@/components/base-components/images/image";
import IconCustom from "@/components/common-components/icon-custom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FormatCurrency } from "@/utilities/text";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
  setProductAvailability,
  setProductOutofStock,
} from "@/stores/datas/price-list";
import { getAblyChannel } from "@/utilities/ably";
import { OutOfStockEvent } from "@/utilities/ably/type";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { priceList, active } = useSelector(
    (state: RootState) => state.price_list
  );

  const products = useMemo(
    () => priceList?.find((item) => item.id === active)?.prices || [],
    [priceList, active]
  );

  useEffect(() => {
    const channel = getAblyChannel("product_outofstock:deal");
    channel.subscribe("product:outofstock", (message) => {
      const productOutofStock: OutOfStockEvent = JSON.parse(message.data);
      if (productOutofStock.data.length > 0) {
        productOutofStock.data.forEach((item) => {
          if (item.availability <= 0) {
            dispatch(setProductOutofStock({ variantId: item.id }));
          } else {
            dispatch(
              setProductAvailability({
                variantId: item.id,
                quantity: item.availability,
              })
            );
          }
        });
      }
    });
  }, []);

  const renderProductItems = () =>
    products.map((item, index) => {
      const discountPercent =
        ((item.variant?.calculated_price?.original_amount - item.amount) /
          item.variant?.calculated_price?.original_amount) *
        100;

      const isOutOfStock =
        item.is_out_of_stock ||
        item.availability <= 0 ||
        item.availability === null ||
        item.stocked_quantity - item.reserved_quantity <= 0;

      const stockQuantity = item.availability
        ? item.availability
        : (item.stocked_quantity || 0) - (item.reserved_quantity || 0);

      return (
        <CarouselItem
          key={index}
          className="basis-1/2 md:basis-1/3 desktop:basis-1/5"
        >
          <Link
            href={`/products/${item?.variant?.product?.handle}?variantId=${item?.variant?.id}`}
            className={cn("flex flex-col items-center group")}
          >
            <div className="relative">
              <div>
                <Image
                  src={
                    item.variant?.metadata?.thumbnail ||
                    item.variant?.product.thumbnail
                  }
                  className={cn(
                    "aspect-square rounded-lg border-2 border-[#FF424E]",
                    isOutOfStock &&
                      "border-gray-200 filter grayscale before:bg-gradient-to-b before:from-transparent before:to-black/50 before:absolute before:inset-0 before:z-10"
                  )}
                />
              </div>
              <div className="absolute top-0 inset-x-0 flex pt-3 px-4 items-center justify-between select-none">
                <div className="w-[49px] h-[22px] bg-[#FFE880] p-0.5 rounded flex items-center gap-0">
                  <img
                    src="/icons/flash.svg"
                    className="size-[22px] -ml-2.5"
                    alt=""
                  />
                  <span className="text-sm -ml-2 font-medium text-[#E36301]">
                    -{discountPercent.toFixed(0)}%
                  </span>
                </div>
                {/* <Button
                  variant="ghost"
                  className="size-[30px] p-0.5 rounded-full text-primary bg-[#F5F5FA]"
                >
                  <IconCustom icon="tabler:heart" className="size-5 mt-0.5" />
                </Button> */}
              </div>
              {/* {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center h-full w-full select-none">
                  <div className="bg-white/60 flex items-center justify-center z-10 h-16 w-full">
                    <p className="text-black text-lg font-semibold uppercase">
                      Hết hàng
                    </p>
                  </div>
                </div>
              )} */}
            </div>
            <div className="p-4 w-full flex flex-col gap-3 select-none">
              <div className="text-sm group-hover:text-primary transition-colors duration-300 cursor-pointer line-clamp-2 font-medium text-[#27272A]">
                {item.variant.title}
              </div>
              <div>
                <p className="text-base text-[#FF3F1A] font-bold">
                  {FormatCurrency(item.amount)}
                </p>
                <p className="text-xs text-[#515158] line-through font-medium">
                  {FormatCurrency(
                    item.variant.calculated_price.original_amount
                  )}
                </p>
              </div>
              <Badge
                className={cn(
                  "w-full font-normal text-center items-center gap-1 justify-center",
                  isOutOfStock
                    ? "bg-gray-300 hover:bg-gray-300/80 cursor-not-allowed text-gray-100"
                    : "bg-[#D93843] hover:bg-[#D93843]/80 text-white"
                )}
              >
                {isOutOfStock ? (
                  "Hết hàng"
                ) : (
                  <>
                    <img src="/icons/fire.svg" className="size-4" alt="" />
                    Còn {stockQuantity}{" "}
                    <span className="block md:hidden">SP</span>
                    <span className="hidden md:block">Sản phẩm</span>
                  </>
                )}
              </Badge>
            </div>
          </Link>
        </CarouselItem>
      );
    });

  return (
    <Carousel opts={{ align: "start", dragFree: true }}>
      <CarouselContent>{renderProductItems()}</CarouselContent>
    </Carousel>
  );
};

export default ProductCarousel;
