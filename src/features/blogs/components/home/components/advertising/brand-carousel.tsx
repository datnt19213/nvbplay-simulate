"use client";

import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useScrollCenterOnScreen } from "@/hooks";
import { cn } from "@/lib/utils";
import { isFadeUpOnActive } from "@/utilities/checker-functions";
import { MoveRight } from "lucide-react";
import { useRef } from "react";

const brands = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/431f/7570/647a1abe26e4a8ed84bec8955d9e6adc?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b~IDaix~ewYR7GtJCEoP5MLMcARbySC7ylGoZwWYlpxA3H-r74w~cqeRx8WZliu81byq5XEW7wv5DxQhXqhHSYSVL-ehBwoDNnG0UNjoKVQ372ijfYxNRPucXJ7L-sN7~nbImvoX34Z9HQze6J7qvTcw0VcrdQ0~w4yB5wnPm~ReHnTjnCXLLvPgzmykZ68RA7Ov--IyS0DLooa-p1ENG5ru88C~S2gHJTGVykCktStM9a3LjTgilIX7H5naA7djuCje7b49C7e~slI~ARQ1NuuLXgprmy6puEhCzKtGSVgZ7VnXpdoHODTKkvbHl2iWw0TdChZ6HLqPf5bPvti64g__",
    icon: "https://s3-alpha-sig.figma.com/img/8795/df9d/b62cd33eacdfda5811fec2391e557744?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XI-LIbuBQR1Te0qriyjs34yZGL9ZaeHPOM96TXRqJoYgD7XKUUJg32FLqDSIrm59nQH6dQe~69rYRriiwwE~U8egm123IdTzgw7eMx4bOGug8tkmWjKNxV1yqG8Ci3S0YYanDvLvr1qlQgOR1iclwXqSQNhTCMN7Y-vQx6AWo~9HTWottY41Zk5Ab3ynXBOLU6mtXfrVcSPhPcv0PqZsal3dqr-GFGRIiVuUE5eI7luovEZI2~esXPrM7v4LCMNpQfnFxddaAu7r~v4sbNNOuHGhXSldEl1lL85wyP26quuRkDncwNMAAsiTthnKI4MdLhB5PlE7pMVBpotuVW1hpQ__",
    name: "Adidas",
    isVerified: true,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/48c4/e611/649c3de4953a3ac700f091210b355665?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EI69nR2RmI81fnNlpH2sDakmPOtGba0BRAZ92iBAqlqZTfBifJsx1m5Z-WRQUVn27b9cICPKN5WyI4TMRKOG6GI23EssaMPd3zDCQ9BaB-nybhejsyp21wv61jOaFsujdCm6bSxgEXFtr3Qiwd4HxRE-2H8YOltzLAsEZ6uqUT58A2V1Rbi26Tybw64dcSTCmCUM5CLKLS6~fodDV4K2IkNTrzYVJlYWaAdukZ7uXVb2tE14ZA3HidmmK5uBp84GEi79avM2c9eqJGtfq5eiLKRLiIoqow96DWRSmF7WPzLHQMsov47HRUvAi5vYDyGovK5tcOsY-xtkQSyzkZ2u1A__",
    icon: "https://s3-alpha-sig.figma.com/img/8795/df9d/b62cd33eacdfda5811fec2391e557744?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XI-LIbuBQR1Te0qriyjs34yZGL9ZaeHPOM96TXRqJoYgD7XKUUJg32FLqDSIrm59nQH6dQe~69rYRriiwwE~U8egm123IdTzgw7eMx4bOGug8tkmWjKNxV1yqG8Ci3S0YYanDvLvr1qlQgOR1iclwXqSQNhTCMN7Y-vQx6AWo~9HTWottY41Zk5Ab3ynXBOLU6mtXfrVcSPhPcv0PqZsal3dqr-GFGRIiVuUE5eI7luovEZI2~esXPrM7v4LCMNpQfnFxddaAu7r~v4sbNNOuHGhXSldEl1lL85wyP26quuRkDncwNMAAsiTthnKI4MdLhB5PlE7pMVBpotuVW1hpQ__",
    name: "Li-ning",
    isVerified: true,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/3d86/07c7/c4c9dc7366bac37291ac8c79716dd84f?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PjNIviQJwUcaVEMnxIXyZkSkv9yqaIOjcASvTio36xqax0t6qts6BIpQyPI9v6stBZxg~oQDG~iQsvCi6Ma1LG29mP9vUkesxAD6gOV0UyPa7m9P4zuM1bE-QxiYHBA7poyiUTu5kk4-slplpAsVe9MvIJOTsnQFdcbh~tcH-DUtdeLydlGomh8tR-Be5dTKndcTijH7Ioomb-ZJaUlNRXZ7BZd2khP7X9ygpte2O1pSRETOfuf-APOZ8nvl7avSLGsKY0-ynSEtDZWjj3Vo3ZI7DyUs9O0FBfQkwopcrOoREQpwtH~OmR0amh6erjDsn5JWrXSfnC4jk9-QXMsvKA__",
    icon: "https://s3-alpha-sig.figma.com/img/8795/df9d/b62cd33eacdfda5811fec2391e557744?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XI-LIbuBQR1Te0qriyjs34yZGL9ZaeHPOM96TXRqJoYgD7XKUUJg32FLqDSIrm59nQH6dQe~69rYRriiwwE~U8egm123IdTzgw7eMx4bOGug8tkmWjKNxV1yqG8Ci3S0YYanDvLvr1qlQgOR1iclwXqSQNhTCMN7Y-vQx6AWo~9HTWottY41Zk5Ab3ynXBOLU6mtXfrVcSPhPcv0PqZsal3dqr-GFGRIiVuUE5eI7luovEZI2~esXPrM7v4LCMNpQfnFxddaAu7r~v4sbNNOuHGhXSldEl1lL85wyP26quuRkDncwNMAAsiTthnKI4MdLhB5PlE7pMVBpotuVW1hpQ__",
    name: "Brand B",
    isVerified: true,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/431f/7570/647a1abe26e4a8ed84bec8955d9e6adc?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b~IDaix~ewYR7GtJCEoP5MLMcARbySC7ylGoZwWYlpxA3H-r74w~cqeRx8WZliu81byq5XEW7wv5DxQhXqhHSYSVL-ehBwoDNnG0UNjoKVQ372ijfYxNRPucXJ7L-sN7~nbImvoX34Z9HQze6J7qvTcw0VcrdQ0~w4yB5wnPm~ReHnTjnCXLLvPgzmykZ68RA7Ov--IyS0DLooa-p1ENG5ru88C~S2gHJTGVykCktStM9a3LjTgilIX7H5naA7djuCje7b49C7e~slI~ARQ1NuuLXgprmy6puEhCzKtGSVgZ7VnXpdoHODTKkvbHl2iWw0TdChZ6HLqPf5bPvti64g__",
    icon: "https://s3-alpha-sig.figma.com/img/8795/df9d/b62cd33eacdfda5811fec2391e557744?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XI-LIbuBQR1Te0qriyjs34yZGL9ZaeHPOM96TXRqJoYgD7XKUUJg32FLqDSIrm59nQH6dQe~69rYRriiwwE~U8egm123IdTzgw7eMx4bOGug8tkmWjKNxV1yqG8Ci3S0YYanDvLvr1qlQgOR1iclwXqSQNhTCMN7Y-vQx6AWo~9HTWottY41Zk5Ab3ynXBOLU6mtXfrVcSPhPcv0PqZsal3dqr-GFGRIiVuUE5eI7luovEZI2~esXPrM7v4LCMNpQfnFxddaAu7r~v4sbNNOuHGhXSldEl1lL85wyP26quuRkDncwNMAAsiTthnKI4MdLhB5PlE7pMVBpotuVW1hpQ__",
    name: "Adidas",
    isVerified: true,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/48c4/e611/649c3de4953a3ac700f091210b355665?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EI69nR2RmI81fnNlpH2sDakmPOtGba0BRAZ92iBAqlqZTfBifJsx1m5Z-WRQUVn27b9cICPKN5WyI4TMRKOG6GI23EssaMPd3zDCQ9BaB-nybhejsyp21wv61jOaFsujdCm6bSxgEXFtr3Qiwd4HxRE-2H8YOltzLAsEZ6uqUT58A2V1Rbi26Tybw64dcSTCmCUM5CLKLS6~fodDV4K2IkNTrzYVJlYWaAdukZ7uXVb2tE14ZA3HidmmK5uBp84GEi79avM2c9eqJGtfq5eiLKRLiIoqow96DWRSmF7WPzLHQMsov47HRUvAi5vYDyGovK5tcOsY-xtkQSyzkZ2u1A__",
    icon: "https://s3-alpha-sig.figma.com/img/8795/df9d/b62cd33eacdfda5811fec2391e557744?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XI-LIbuBQR1Te0qriyjs34yZGL9ZaeHPOM96TXRqJoYgD7XKUUJg32FLqDSIrm59nQH6dQe~69rYRriiwwE~U8egm123IdTzgw7eMx4bOGug8tkmWjKNxV1yqG8Ci3S0YYanDvLvr1qlQgOR1iclwXqSQNhTCMN7Y-vQx6AWo~9HTWottY41Zk5Ab3ynXBOLU6mtXfrVcSPhPcv0PqZsal3dqr-GFGRIiVuUE5eI7luovEZI2~esXPrM7v4LCMNpQfnFxddaAu7r~v4sbNNOuHGhXSldEl1lL85wyP26quuRkDncwNMAAsiTthnKI4MdLhB5PlE7pMVBpotuVW1hpQ__",
    name: "Li-ning",
    isVerified: true,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/3d86/07c7/c4c9dc7366bac37291ac8c79716dd84f?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PjNIviQJwUcaVEMnxIXyZkSkv9yqaIOjcASvTio36xqax0t6qts6BIpQyPI9v6stBZxg~oQDG~iQsvCi6Ma1LG29mP9vUkesxAD6gOV0UyPa7m9P4zuM1bE-QxiYHBA7poyiUTu5kk4-slplpAsVe9MvIJOTsnQFdcbh~tcH-DUtdeLydlGomh8tR-Be5dTKndcTijH7Ioomb-ZJaUlNRXZ7BZd2khP7X9ygpte2O1pSRETOfuf-APOZ8nvl7avSLGsKY0-ynSEtDZWjj3Vo3ZI7DyUs9O0FBfQkwopcrOoREQpwtH~OmR0amh6erjDsn5JWrXSfnC4jk9-QXMsvKA__",
    icon: "https://s3-alpha-sig.figma.com/img/8795/df9d/b62cd33eacdfda5811fec2391e557744?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XI-LIbuBQR1Te0qriyjs34yZGL9ZaeHPOM96TXRqJoYgD7XKUUJg32FLqDSIrm59nQH6dQe~69rYRriiwwE~U8egm123IdTzgw7eMx4bOGug8tkmWjKNxV1yqG8Ci3S0YYanDvLvr1qlQgOR1iclwXqSQNhTCMN7Y-vQx6AWo~9HTWottY41Zk5Ab3ynXBOLU6mtXfrVcSPhPcv0PqZsal3dqr-GFGRIiVuUE5eI7luovEZI2~esXPrM7v4LCMNpQfnFxddaAu7r~v4sbNNOuHGhXSldEl1lL85wyP26quuRkDncwNMAAsiTthnKI4MdLhB5PlE7pMVBpotuVW1hpQ__",
    name: "Brand B",
    isVerified: true,
  },
];

export const BrandCarousel = () => {
  const ref = useRef<any>(null);
  const isActive = useScrollCenterOnScreen(ref);

  const items = brands.map((item, index) => (
    <CarouselItem
      key={index}
      className="basis-1/2 md:basis-[30%] pl-1 desktop:pl-2"
    >
      <div className="relative rounded-lg overflow-hidden flex flex-col justify-between p-3 h-[286px] group cursor-pointer">
        {/* IMAGE & OVERLAY */}
        <Image
          src={item.image}
          className="w-full h-full rounded-xl overflow-hidden object-cover absolute inset-0 z-[-1] group-hover:scale-105 cursor-pointer ease-in-out transition-transform duration-300"
        />
        <div className="absolute inset-x-0 bottom-0 w-full h-[6.75rem] bg-gradient-to-b from-black/0 to-black/100" />
        {/* VIEW */}
        <div></div>
        {/* INFO */}
        <div className="z-0 flex justify-between items-center gap-2 mb-4 px-1">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-black p-2 overflow-hidden">
              <Image
                src={item.icon}
                className="w-full h-full size-5 object-cover group-hover:scale-105 cursor-pointer ease-in-out transition-transform duration-300"
              />
            </div>
            <span className="text-base font-semibold line-clamp-2 text-white">
              {item.name}
            </span>
            {item.isVerified && (
              <Image
                src={"/images/blog/home/verifired.png"}
                className="w-full h-full size-5 object-cover group-hover:scale-105 cursor-pointer ease-in-out transition-transform duration-300"
              />
            )}
          </div>
          <Button
            className="bg-black bg-opacity-50 hover:bg-black hover:bg-opacity-70 rounded-full"
            size={"icon"}
          >
            <MoveRight className="size-4 text-white" />
          </Button>
        </div>
      </div>
    </CarouselItem>
  ));

  return (
    <Carousel
      ref={ref}
      opts={{
        align: "start",
      }}
      className={cn(isFadeUpOnActive(isActive))}
    >
      <CarouselContent>{items}</CarouselContent>
    </Carousel>
  );
};
