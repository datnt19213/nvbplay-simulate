import Image from "@/components/base-components/images/image";
import { Icon } from "@/components/common-components";
import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";
import { ReactSVG } from "react-svg";

type MenuCategoryProps = {
  title: string;
  icon?: string;
  image?: any;
  description?: string;
  isActive?: boolean;
} & HTMLAttributes<HTMLDivElement>;
const MenuCategoryItem: FC<MenuCategoryProps> = ({
  title,
  description,
  image,
  isActive,
  icon,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex h-[63px] group cursor-pointer hover:bg-[#F5F5FA] transition-all duration-500 w-full min-w-[296px] items-center gap-2 rounded-lg p-3",
        isActive && "bg-[#F5F5FA]"
      )}
    >
      {/* <ReactSVG
        src={image}
        beforeInjection={(svg) => {
          const defs = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
          );
          if (isActive) {
            defs.innerHTML = `
        <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#A079FC" />
          <stop offset="100%" stop-color="#0D5BB5" />
        </linearGradient>
      `;
          }
          svg.prepend(defs);

          svg.querySelectorAll("[stroke]").forEach((el) => {
            el.setAttribute(
              "stroke",
              isActive ? "url(#customGradient)" : "#515158"
            );
          });
          svg.querySelectorAll("[fill]").forEach((el) => {
            el.setAttribute(
              "fill",
              isActive ? "url(#customGradient)" : "#515158"
            );
          });
        }}
        className="h-9 w-9"
      /> */}
      <div className="size-10 aspect-square">
        <Image
          src={image}
          alt={title}
          className={cn("object-cover")}
        />
      </div>

      <div className="flex h-full w-full flex-col justify-center">
        <span className="text-sm font-semibold text-txtprimary">{title}</span>
        <span className="text-xs font-medium text-txtsecondary">
          {description}
        </span>
      </div>
      <div
        className={cn(
          "flex aspect-square h-5 w-5 items-center justify-center",
          isActive && "text-blue-hovered"
        )}
      >
        {icon && <Icon icon={icon} fontSize={20} />}
      </div>
    </div>
  );
};

export default MenuCategoryItem;
