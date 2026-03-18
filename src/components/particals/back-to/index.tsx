import {Icon} from "@/components/common-components";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import React, {FC, ReactNode} from "react";

type BackToProps = {
  url?: string;
  children: ReactNode;
  backToButton?: ReactNode;
  className?: string;
  titleClass?: string;
};

const BackTo: FC<BackToProps> = ({
  children,
  className,
  titleClass,
  backToButton = (
    <Button
      className={
        "text-sm pl-2 pr-4 font-semibold bg-gray-border hover:!bg-gray-border text-txtprimary"
      }
    >
      <Icon icon="ph:caret-left" fontSize={24} /> Trở lại
    </Button>
  ),
  url,
}) => {
  return (
    <div
      className={cn(
        "h-[72px] w-full bg-white gap-2 rounded-t-lg overflow-hidden flex items-center justify-start px-4",
        className
      )}
    >
      <Link href={url || "#"}>{backToButton}</Link>
      <div className={cn("font-semibold text-lg", titleClass)}>{children}</div>
    </div>
  );
};

export default BackTo;
