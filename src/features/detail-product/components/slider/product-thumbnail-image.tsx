import Image from "@/components/base-components/images/image";
import { cn } from "@/lib/utils";
import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: string;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div className={"embla-thumbs__slide"}>
      <div
        onClick={onClick}
        className={cn(
          "w-full aspect-square relative rounded-[8px] overflow-hidden cursor-pointer",
          selected && " border-2 border-orange-600"
        )}
      >
        <Image
          src={image}
          alt={`Slide ${index + 1}`}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};
