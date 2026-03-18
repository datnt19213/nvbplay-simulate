import { GlobalLayoutProps } from "@/types";
import dynamic from "next/dynamic";
const NavigationBar = dynamic(() =>
  import("@/components/base-components").then((mob) => mob.NavigationBar)
);
// const Header = dynamic(() =>
//   import("@/components/base-components").then((mob) => mob.Header)
// );
const NotificationLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <>
      {/* <Header onlyBanner /> */}
      {children}
      <NavigationBar />
    </>
  );
};

export default NotificationLayout;
