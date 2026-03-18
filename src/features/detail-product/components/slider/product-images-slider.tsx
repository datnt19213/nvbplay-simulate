"use client";

import "react-photo-view/dist/react-photo-view.css";

import notfound from "@/assets/images/not-found.png";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { PhotoSlider } from "react-photo-view";
import "swiper/css";
import { Thumb } from "./product-thumbnail-image";
import Image from "@/components/base-components/images/image";

interface IProps {
  images: string[];
}

const ProductImagesSlider: React.FC<IProps> = ({ images }) => {
  // const variant = useSelector(
  //   (state: RootState) => state.detail_product.variant
  // );

  // Overlay image state
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaMainApi, emblaThumbsApi, setSelectedIndex]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <>
      {images && images.length > 0 ? (
        <div className="w-full space-y-[24px]">
          {/* Carousel */}
          <div className="relative">
            <div className="embla">
              {/* Main Slide */}
              <div className="embla__viewport" ref={emblaMainRef}>
                <div className="embla__container">
                  {images.map((image, index) => (
                    <div className="embla__slide bg-neutral-50" key={index}>
                      <div className="h-[21.875rem] lg:h-[31.25rem] w-full">
                        <div
                          className="w-full rounded-[8px] overflow-hidden"
                          onClick={() => setVisible(true)}
                        >
                          <Image
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thumbnail */}
              <div className="embla-thumbs">
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                  <div className="embla-thumbs__container">
                    {images.map((image, index) => (
                      <Thumb
                        key={index}
                        onClick={() => onThumbClick(index)}
                        selected={index === selectedIndex}
                        index={index}
                        image={image}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Counter */}
            <div className="absolute left-2 bottom-[138px] md:bottom-20 lg:bottom-28 z-20 w-full">
              <span className="text-[12px] leading-[18px] bg-white text-[#515158] border border-neutral-300 rounded-full px-2 py-1">
                {selectedIndex + 1}/{images.length}
              </span>
            </div>

            {/* Zoom Button */}
            <Button
              size={"icon"}
              variant={"grayPrimary"}
              className="rounded-full absolute right-2 bottom-[138px] md:bottom-20 lg:bottom-28 z-20 p-0 size-8 bg-[#F5F5FA]"
              onClick={() => setVisible(true)}
            >
              <ZoomIn className="size-4" />
            </Button>
          </div>

          {/* Overlay image */}
          <PhotoSlider
            images={images.map((item) => ({ src: item, key: item }))}
            visible={visible}
            speed={() => 50}
            onClose={() => setVisible(false)}
            index={selectedIndex}
            onIndexChange={setSelectedIndex}
            maskOpacity={0.8}
          />
        </div>
      ) : (
        <div className="w-full aspect-square relative rounded-[8px] overflow-hidden">
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center gap-4">
              <img src={notfound.src} alt="icon" className="size-40" />
              <span className="text-txtsecondary text-[14px] leading-[21px] font-[400]">
                Sản phẩm không có hình ảnh
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImagesSlider;
