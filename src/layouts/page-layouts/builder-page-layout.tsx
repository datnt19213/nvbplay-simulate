import {BuilderHeader} from "@/components/base-components/header/builder-header";
import {cn} from "@/lib/utils";
import {GlobalLayoutProps} from "@/types";
import React, {FC} from "react";

const BuilderPageLayout: FC<GlobalLayoutProps> = ({children}) => {
  return (
    <div
      className={cn("flex flex-col w-full overflow-y-scroll scrollbar-none")}
    >
      <BuilderHeader />
      {children}
    </div>
  );
};

export default BuilderPageLayout;
