import ProductImagesSlider from "@/features/detail-product/components/slider/product-images-slider";
import React, {CSSProperties, FC, useState} from "react";
import {PhotoSlider} from "react-photo-view";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import {Autoplay, EffectFade} from "swiper/modules";
import {Icon} from "@/components/common-components";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {translate} from "@/utilities/translator";
import {cn} from "@/lib/utils";
import {formatNumber} from "@/utilities/formator";
import {
  Batminton,
  TrendCategory1,
  TrendCategory2,
  TrendCategory3,
  TrendCategory4,
} from "@/assets/images";

type ProductBuilderCardProps = {
  data: any;
  key?: string | number;
  itemIndex?: number;
  images?: string[];
  sku?: string;
  label?: string;
  sale_price?: number | null;
  regular_price?: number;
  qty?: number;
  isSelected?: boolean;
  style?: CSSProperties;
  onSelected?: (itemSelected: any) => void;
  delay?: number;
};

const ProductBuilderCard: FC<ProductBuilderCardProps> = ({
  itemIndex = 0,
  images = [
    Batminton.src,
    TrendCategory1.src,
    TrendCategory2.src,
    TrendCategory3.src,
    TrendCategory4.src,
  ],
  label = "Product Name",
  qty = "0",
  regular_price = 999999,
  sale_price = 99999,
  sku = "ABCXYZ",
  isSelected,
  style,
  data,
  delay = 50,
  onSelected,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div
      style={style}
      className="min-w-[218px] w-auto flex flex-col relative items-center bg-white rounded-lg overflow-hidden animate-in fadeup"
    >
      <div className="aspect-square w-full relative">
        <Swiper
          effect={"fade"}
          autoplay={{
            delay: 15000 + delay * itemIndex,
            disableOnInteraction: false,
          }}
          preventInteractionOnTransition={true}
          onAutoplay={(swiper) =>
            !visible && setSelectedIndex(swiper.realIndex)
          }
          onInit={(swiper) =>
            !visible &&
            swiper.realIndex <= images.length - 1 &&
            setSelectedIndex(swiper.realIndex)
          }
          onSwiper={(swiper) =>
            !visible &&
            swiper.realIndex <= images.length - 1 &&
            setSelectedIndex(swiper.realIndex)
          }
          loop={true}
          modules={[EffectFade, Autoplay]}
          wrapperClass="w-full overflow-hidden rounded-lg aspect-square relative z-[1] pointer-events-none"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item} className="w-full h-auto object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="h-8 w-8 absolute bottom-2 right-2 z-[2] flex items-center justify-center rounded-full bg-gray-primary cursor-pointer"
          onClick={() => setVisible(true)}
        >
          <Icon icon="ph:magnifying-glass-plus" fontSize={20} />
        </div>
        <PhotoSlider
          images={images.map((item, index) => ({src: item, key: index}))}
          bannerVisible={true}
          maskClosable={true}
          visible={visible}
          onClose={() => setVisible(false)}
          index={selectedIndex}
          onIndexChange={setSelectedIndex}
          maskOpacity={0.8}
        />
      </div>
      <div className="w-full flex flex-col justify-between gap-2 p-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-xs text-gray-icon">
              {translate("sku")}:{sku}
            </span>
            <span className="font-medium text-sm text-txtprimary line-clamp-2">
              {label}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold text-txtthird">
              {(sale_price &&
                formatNumber(sale_price, {
                  mode: "currency",
                  currency: "VND",
                  precision: 0,
                  locale: "vi-VN",
                  showUnit: true,
                })) ||
                formatNumber(regular_price, {
                  mode: "currency",
                  currency: "VND",
                  precision: 0,
                  locale: "vi-VN",
                  showUnit: true,
                })}
            </span>
            {sale_price && (
              <span className="font-medium text-xs text-gray-icon line-through">
                {formatNumber(regular_price, {
                  mode: "currency",
                  currency: "VND",
                  precision: 0,
                  locale: "vi-VN",
                  showUnit: true,
                })}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-gray-icon font-medium text-xs flex items-center">
            <Icon icon="tabler:building-store" fontSize={16} />
            {translate("settle")}: {qty}
          </div>
          <ButtonSubmitPrimary
            onClickHandle={() => onSelected && onSelected(data)}
            className={cn(
              "bg-gray-border text-gray-icon hover:bg-gray-border hover:text-gray-icon border border-transparent",
              isSelected &&
                "border-blue-primary text-blue-primary hover:text-blue-primary"
            )}
          >
            {translate(isSelected ? "selected" : "select")}
          </ButtonSubmitPrimary>
        </div>
      </div>
    </div>
  );
};

export default ProductBuilderCard;
