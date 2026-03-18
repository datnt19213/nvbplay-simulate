import Image from "@/components/base-components/images/image";
import Heading from "@/components/base-components/typography/heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { COMMON_DATA } from "@/configs";
import { StoryContainer } from "@/features/blogs/components/stories";
import { cn } from "@/lib/utils";
import { ChartNoAxesColumn, PlusIcon } from "lucide-react";
import { CreateStoryModal } from "./create-story-modal";

export const Stories = () => {
  const items = COMMON_DATA.live.map((live, index) => (
    <CarouselItem
      className="basis-1/2 md:basis-1/5 desktop:basis-[13.80%] pl-1 desktop:pl-2"
      key={index}
    >
      <StoryContainer image={live.image}>
        <div className="relative rounded-lg overflow-hidden flex flex-col justify-between p-3 h-[286px] group cursor-pointer">
          {/* IMAGE & OVERLAY */}
          <Image
            src={live.image}
            className="w-full h-full object-cover absolute inset-0 z-[-1] group-hover:scale-105 cursor-pointer ease-in-out transition-transform duration-300"
          />
          <div className="absolute inset-x-0 bottom-0 w-full h-[6.75rem] bg-gradient-to-b from-black/0 to-black/100" />
          {/* VIEW */}
          <div className="flex items-center rounded overflow-hidden text-[10px] uppercase text-sm text-white font-medium">
            <div className="relative border border-[#FF3F1A] rounded-full">
              <Image src={live.host.image} className="size-7" alt={live.name} />
              <div className="absolute top-1 -translate-y-1/2 right-0 size-[0.3125rem] bg-[#FF3F1A] border border-white rounded-full" />
            </div>
          </div>
          {/* INFO */}
          <div className="z-0">
            <p className="text-sm line-clamp-2 text-white">{live.name}</p>
          </div>
        </div>
      </StoryContainer>
    </CarouselItem>
  ));

  const createStory = () => {
    return (
      <CarouselItem className="basis-1/2 md:basis-1/5 desktop:basis-[13.80%] pl-1 desktop:pl-2">
        <CreateStoryModal>
          <div className="relative rounded-lg overflow-hidden flex flex-col justify-between items-center p-3 h-[286px] group cursor-pointer bg-gradient-to-b from-[#0F68A9] to-[#F187FB]">
            {/* VIEW */}
            <div></div>
            <div className="flex items-center rounded overflow-visible text-[10px] mt-28 uppercase text-sm text-white font-medium">
              <div className="relative border border-white rounded-full">
                <Image
                  src={"/images/blog/home/create-story.jpg"}
                  className="size-12 rounded-full"
                  alt={"create-story"}
                />
                <div className="bg-white p-[2px] w-fit absolute -bottom-2 left-4 right-0 rounded-full flex items-center justify-center">
                  <PlusIcon className="size-3 text-[#FF3F1A]" />
                </div>
              </div>
            </div>
            {/* INFO */}
            <div className="z-0">
              <p className="text-sm text-center line-clamp-2 text-white">
                Tạo câu chuyện
              </p>
            </div>
          </div>
        </CreateStoryModal>
      </CarouselItem>
    );
  };

  const nvpPlayLive = () => {
    return (
      <CarouselItem className="basis-1/2 md:basis-1/5 desktop:basis-[13.80%] pl-1 desktop:pl-2">
        <StoryContainer image={"/images/live1.png"}>
          <div className="relative rounded-lg overflow-hidden flex flex-col justify-between p-3 h-[286px] group cursor-pointer">
            {/* IMAGE & OVERLAY */}
            <Image
              src={"/images/live1.png"}
              className="w-full h-full object-cover absolute inset-0 z-[-1] group-hover:scale-105 cursor-pointer ease-in-out transition-transform duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 w-full h-[6.75rem] bg-gradient-to-b from-black/0 to-black/100" />
            {/* VIEW */}
            <div className="flex justify-between items-center rounded overflow-visible text-[10px] uppercase text-sm text-white font-medium">
              <div className="relative border border-[#FF3F1A] rounded-full">
                <Image
                  src={"/images/blog/home/livestream-logo.png"}
                  className="size-7 rounded-full"
                  alt={"NVP Logo"}
                />
                <div className="absolute -bottom-2 left-[5px] right-0 size-4 p-1 bg-[#FF3F1A] border border-white rounded-full flex justify-center items-center">
                  <ChartNoAxesColumn
                    className="w-full h-full text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center px-1 rounded-s bg-[#D93843]">
                Live
              </div>
            </div>
            {/* INFO */}
            <div className="z-0">
              <p className="text-sm line-clamp-2 text-white">NVP Play Live</p>
            </div>
          </div>
        </StoryContainer>
      </CarouselItem>
    );
  };

  return (
    <div className={cn("flex flex-col gap-4")}>
      <div className="flex items-center justify-between">
        <Heading>Câu chuyện</Heading>
        <p className="text-sm font-medium text-primary hover:text-primary/80">
          Xem tất cả
        </p>
      </div>
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="-ml-1 desktop:-ml-2">
          {createStory()}
          {nvpPlayLive()}
          {items}
        </CarouselContent>

        <CarouselPrevious className="left-4 text-white bg-black bg-opacity-80 border border-black" />
        <CarouselNext className="right-4 text-white bg-black bg-opacity-80 border border-black" />
      </Carousel>
    </div>
  );
};
