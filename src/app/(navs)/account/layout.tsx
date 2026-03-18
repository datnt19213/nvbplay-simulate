import { GlobalLayoutProps } from "@/types";
import dynamic from "next/dynamic";
const Header = dynamic(() =>
  import("@/components/base-components").then((mob) => mob.Header)
);
const NavigationBar = dynamic(() =>
  import("@/components/base-components").then((mob) => mob.NavigationBar)
);
const AccountLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <NavigationBar />
    </>
  );
};

export default AccountLayout;
