import React, { FC } from "react";

type BrandsItemProps = {
  title: string;
  image: string;
  onClick?: () => void;
};

const BrandsItem: FC<BrandsItemProps> = ({ image, title, onClick }) => {
  return (
    <div
      className="flex h-12 w-full items-center gap-2 rounded-lg bg-gray-primary p-2 cursor-pointer hover:bg-gray-200"
      onClick={onClick}
    >
      {image && (
        <img
          // border border-gray-50
          className="aspect-square object-contain h-8 w-8 rounded-[0.25rem]"
          src={image}
          alt={title}
        />
      )}
      <span className="text-sm font-medium text-txtfifth">{title}</span>
    </div>
  );
};

export default BrandsItem;
