import {cn} from "@/lib/utils";
import React, {FC, ReactNode} from "react";
import {ButtonSubmitPrimary} from "../buttons";
import {redirect, RedirectType} from "next/navigation";

type EmptyItemProps = {
  image: string;
  isNavigable?: boolean;
  navigateUrl?: string;
  onClick?: () => void;
  title: ReactNode;
  subTitle?: ReactNode;
  className?: string;
  buttonTitle?: string;
  buttonClassName?: string;
  iconButton?: ReactNode;
  actionButton?: ReactNode;
  subTitleClass?: string;
  titleClass?: string;
};

const EmptyItem: FC<EmptyItemProps> = ({
  image,
  title,
  isNavigable,
  navigateUrl,
  subTitle,
  onClick,
  className,
  buttonTitle,
  buttonClassName,
  iconButton,
  actionButton,
  subTitleClass,
  titleClass,
}) => {
  function navigateFnc(): void {
    redirect(`${navigateUrl || "/"}`, RedirectType.push);
  }

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center gap-4 min-h-[560px]",
        className
      )}
    >
      <div className="flex flex-col gap-4 items-center">
        <img
          src={image}
          alt="empty-img"
          className="max-w-[240px] w-full h-auto"
        />
        <div className="flex flex-col items-center">
          {title && (
            <span
              className={cn(
                "text-sm font-semibold text-gray-fifth",
                titleClass
              )}
            >
              {title}
            </span>
          )}
          {subTitle && (
            <span
              className={cn(
                "text-sm font-semibold text-gray-fifth",
                subTitleClass
              )}
            >
              {subTitle}
            </span>
          )}
        </div>
      </div>
      {actionButton && actionButton}
      {isNavigable && (
        <ButtonSubmitPrimary
          className={cn("w-fit flex items-center gap-3", buttonClassName)}
          onClickHandle={() => {
            if (onClick) {
              onClick();
            }
            navigateFnc();
          }}
        >
          {iconButton && iconButton}
          {(buttonTitle && buttonTitle) || "Khám phá thêm"}
        </ButtonSubmitPrimary>
      )}
    </div>
  );
};

export default EmptyItem;
