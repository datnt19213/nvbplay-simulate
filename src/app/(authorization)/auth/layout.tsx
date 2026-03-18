import {BgAuth} from "@/assets/images";
import {HomeLayout} from "@/layouts/page-layouts";
import {RemoveACookie} from "@/utilities/cookies";
import React, {FC, ReactNode} from "react";

type LayoutAuthProps = {
  children: ReactNode;
};
const Layout: FC<LayoutAuthProps> = ({children}) => {
  return (
    <HomeLayout className="bg-white py-10">
      <div className="h-fit max-w-[1440px] w-full mx-auto p-6 flex items-center justify-center">
        <div className="w-full overflow-hidden bg-gray-fifth rounded-[32px] desktop:block hidden">
          <img
            src={BgAuth.src}
            className="w-auto h-full object-contain"
            alt="bg auth"
          />
        </div>
        {children}
      </div>
    </HomeLayout>
  );
};

export default Layout;
