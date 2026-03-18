import {cn} from "@/lib/utils";
import React, {FC, ReactNode} from "react";

export const AuthFormLayout: FC<{children: ReactNode; className?: string}> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("min-w-[480px] h-full", className)}>{children}</div>
  );
};
