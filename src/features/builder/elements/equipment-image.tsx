import {Batminton} from "@/assets/images";
import Image from "@/components/base-components/images/image";
import React, {FC, ReactNode} from "react";

type EquipmentSetImageListProps = {
  images: string[];
};
export const EquipmentSetImageList: FC<EquipmentSetImageListProps> = ({
  images = [
    Batminton.src,
    Batminton.src,
    Batminton.src,
    Batminton.src,
    Batminton.src,
  ],
}) => {
  return (
    <div className="flex items-center gap-1">
      {images.map(
        (image, index) =>
          index < 4 && (
            <Image
              key={index}
              src={image}
              alt="collection image"
              className="w-[52px] h-[52px] rounded-lg border border-[#DDDDE3] overflow-hidden"
            />
          )
      )}
      {images.length > 4 && (
        <ImageOverNumber number={`+${images.length - 4}`} />
      )}
    </div>
  );
};

type ImageOverNumberProps = {
  number: ReactNode;
};
const ImageOverNumber: FC<ImageOverNumberProps> = ({number}) => {
  return (
    <div className="text-gray-icon text-sm font-semibold h-[52px] w-[52px] flex items-center justify-center rounded-lg bg-gray-primary">
      {number}
    </div>
  );
};
