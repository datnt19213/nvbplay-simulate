"use client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Image from "../images/image";
import {bg_coin, coin, subcription, vector} from "@/assets/icons";
import {COMMON_DATA, ENUM} from "@/configs";
// import LoyaltyCard from "@/features/account/components/loyalty-card";
import NavLinks from "@/features/account/components/nav-links";
import NoUser from "../cta/no-user";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores";
import {getUserData} from "@/services/users";
import {setUserData} from "@/stores/datas/users-data-slice";
import {redirect, RedirectType} from "next/navigation";
import Gavatar from "../avartar";
import {GetBgColorFromFirstVowel} from "@/utilities/text-to-color";

const UserButton = () => {
  const {user} = useSelector((state: RootState) => state.users_data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      dispatch(setUserData(data));
    };
    fetchData();
  }, []);

  function handleNavigateAth(): void {
    redirect("/auth", RedirectType.push);
  }

  return (
    <>
      {user && (
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-center">
              {user?.image ? (
                <Avatar className="size-10 cursor-pointer">
                  <AvatarImage
                    src={user?.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              ) : (
                <Gavatar
                  className="!w-10 !h-10 cursor-pointer"
                  size="sm"
                  backgroundColor={
                    user?.first_name &&
                    GetBgColorFromFirstVowel(user?.first_name)
                  }
                  sizeText="md"
                >
                  {user?.first_name && user?.first_name.charAt(0)}
                </Gavatar>
              )}
            </div>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="end"
            className="rounded-2xl p-0 w-[25rem] max-h-[32rem]"
          >
            <div className="h-[32rem] overflow-y-scroll overflow-x-hidden scrollbar-none">
              {/* TITLE */}
              <div className="flex flex-col w-full py-4 px-4">
                <p className="text-base">Xin chào,</p>
                <div className="text-lg font-semibold flex justify-between items-center">
                  <h5 className="line-clamp-1">{user?.first_name}</h5>
                  <Image src={subcription.src} className="cursor-pointer" />
                </div>
              </div>
              <div className="border-b border-gray-100" />
              {/* CARD */}
              {/* <div className="p-4">
                <LoyaltyCard />
              </div> */}
              <div className="border-b border-gray-100" />
              {/* LINKS */}
              <NavLinks data={COMMON_DATA.header.user_buttons} />
            </div>
          </PopoverContent>
        </Popover>
      )}
      {!user && (
        <NoUser
          className="text-gray-secondary"
          onClick={() => handleNavigateAth()}
        />
      )}
    </>
  );
};

export default UserButton;
