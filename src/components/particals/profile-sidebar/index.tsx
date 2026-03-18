"use client";
import React, {useEffect} from "react";
import StickyBox from "react-sticky-box";
import UserCard from "./components/user-card";
import {COMMON_DATA, ENUM} from "@/configs";
import {ProfileSidebarItem} from "./element";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores";
import {coin} from "@/assets/icons";
import {setSidebarSelected, setSignOutModal} from "@/stores/profile";
import {usePathname, useRouter} from "next/navigation";
import {Icon} from "@/components/common-components";
import {translate} from "@/utilities/translator";

const ProfileSidebar = () => {
  const {sidebarSelected} = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    dispatch(setSidebarSelected(pathName));
  }, [pathName]);
  const handlePushRoute = (route: string) => {
    router.push(route);
    dispatch(setSidebarSelected(route));
  };

  return (
    <StickyBox
      offsetTop={164}
      className="w-full max-w-[312px] hidden desktop:flex flex-col gap-2 "
    >
      <div className="flex flex-col gap-3 w-full">
        <UserCard />
        <div className="flex flex-col gap-2 w-full bg-white overflow-hidden rounded-lg py-1">
          {COMMON_DATA.profile_sidebar.map((profile: any, index) => (
            <ProfileSidebarItem
              key={index}
              title={translate(profile.title)}
              isActive={
                sidebarSelected === profile.url ||
                (sidebarSelected.startsWith("/profile/personal-info") &&
                  profile.url.startsWith("/profile/personal-info"))
              }
              handleClickSidebar={() => handlePushRoute(profile.url)}
              icon={
                profile.icon !== "" ? (
                  profile.icon
                ) : (
                  <img src={coin.src} className="size-6" />
                )
              }
            />
          ))}
          <ProfileSidebarItem
            title="Đăng xuất"
            isActive={false}
            handleClickSidebar={() => dispatch(setSignOutModal(true))}
            icon={<Icon icon={"ph:sign-out"} fontSize={24} />}
          />
        </div>
      </div>
    </StickyBox>
  );
};

export default ProfileSidebar;
