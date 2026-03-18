import React, { FC, ReactNode } from "react";

type TypeProductProps = {
  title: string;
  children: ReactNode;
  onClick?: () => void;
};
export const TypeProduct: FC<TypeProductProps> = ({
  children,
  title,
  onClick,
}) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <span
        className="text-sm font-semibold hover:text-primary cursor-pointer text-txtfourth"
        onClick={onClick}
      >
        {title}
      </span>
      <div className="grid grid-cols-2 gap-2 desktop:grid-cols-1">
        {children}
      </div>
    </div>
  );
};

type TypeProductItemProps = {
  title: string;
  onClick?: () => void;
};
export const TypeProductItem: FC<TypeProductItemProps> = ({
  title,
  onClick,
}) => {
  return (
    <span
      className="line-clamp-1 flex h-10 items-center justify-center text-nowrap rounded-lg bg-gray-primary px-2 text-sm text-txtfifth hover:text-primary cursor-pointer desktop:h-fit desktop:justify-start desktop:bg-transparent desktop:px-0"
      onClick={onClick}
    >
      {title}
    </span>
  );
};
