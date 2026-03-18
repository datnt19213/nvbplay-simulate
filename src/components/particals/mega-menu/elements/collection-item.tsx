import {cn} from "@/lib/utils";
import React, {FC} from "react";

type CollectionItemSquareProps = {
  title: string;
  image: string;
};

export const CollectionItemSquare: FC<CollectionItemSquareProps> = ({
  image,
  title,
}) => {
  return (
    <div className="relative aspect-square h-auto w-full overflow-hidden rounded-lg bg-slate-200">
      <img
        src={image}
        alt={title}
        className="relative z-[1] h-full w-full object-cover"
      />
      <div className="absolute left-0 top-0 z-[2] h-full w-full bg-gradient-to-b from-transparent from-60% via-transparent to-black opacity-40" />
      <div className="absolute bottom-0 left-0 z-[3] flex h-[2.812rem] w-full items-center justify-start gap-2 p-3">
        <span className="text-[0.875rem] font-semibold text-white">
          {title}
        </span>
      </div>
    </div>
  );
};
type CollectionItemRectangleProps = {
  title: string;
  image: string;
  className?: string;
};

export const CollectionItemRectangle: FC<CollectionItemRectangleProps> = ({
  image,
  title,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "relative h-[8.75rem] w-full overflow-hidden rounded-lg bg-slate-200",
        className
      )}
    >
      <img
        src={image}
        alt={title}
        className="relative z-[1] h-full w-full object-cover"
      />
      <div className="absolute left-0 top-0 z-[2] h-full w-full bg-gradient-to-b from-transparent from-60% via-transparent to-black opacity-40" />
      <div className="absolute bottom-0 left-0 z-[3] flex h-[2.812rem] w-full items-center justify-start gap-2 p-3">
        <span className="text-[0.875rem] font-semibold text-white">
          {title}
        </span>
      </div>
    </div>
  );
};
