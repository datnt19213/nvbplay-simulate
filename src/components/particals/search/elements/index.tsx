import Image from "@/components/base-components/images/image";
import Link from "next/link";
import { FC } from "react";

type CardTrendCategoryProps = {
  image: string;
  title: string;
  onClick?: () => void;
};

export const CardTrendCategory: FC<CardTrendCategoryProps> = ({
  image,
  title,
  onClick,
}) => {

  return (
    <div
      className="flex flex-col relative overflow-hidden rounded-md cursor-pointer h-full w-full"
      onClick={onClick}
    >
      <Image
        src={image ? image : undefined}
        alt={title}
        className="relative z-[1] h-full w-full bg-gray-50 "
        loading="lazy"
        classNameImage="object-cover object-center"
      />

      <div className="absolute top-0 left-0 z-[2] w-full h-full bg-gradient-to-b from-transparent from-70% to-black/85 " />
      <span className="h-[45px] absolute bottom-0 left-0 z-[3] text-white font-bold text-sm p-3 w-full uppercase leading-[21px] text-nowrap line-clamp-1">
        {title}
      </span>
    </div>
  );
};

type SearchSuggestionItemProps = {
  image: string;
  title: string;
  handle: string;
  handleClick?: (e: React.MouseEvent) => void;
};
export const SearchSuggestionItem: FC<SearchSuggestionItemProps> = ({
  image,
  title,
  handle,
  handleClick,
}) => {
  return (
    <Link
      href={`/products/${handle}`}
      className="flex h-full max-h-[80px] w-full gap-4 overflow-hidden"
      onClick={handleClick && handleClick}
    >
      <Image
        src={image ? image : undefined}
        alt=""
        width={80}
        height={80}
        className="object-cover size-[80px] rounded-[8px] border border-[#ebebf0]"
      />
      <div className="flex flex-col justify-center">
        <span className="text-14-21-500 text-[#27272a]">{title}</span>
      </div>
    </Link>
  );
};
