import { cn } from "@/lib/utils";
import { HomeLayoutProps } from "@/types";
import dynamic from "next/dynamic";
import { FC } from "react";
const Header = dynamic(() =>
  import("@/components/base-components").then((mob) => mob.Header)
);
const NavigationBar = dynamic(() =>
  import("@/components/base-components").then((mob) => mob.NavigationBar)
);
const HomeLayout: FC<HomeLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("w-full h-auto", className)}>
      {/* <Header isSearch /> */}
      {children}
      <NavigationBar />
    </div>
  );
};

export default HomeLayout;
