"use client";
import {BgAuth, RankMember} from "@/assets/images";
import Gavatar from "@/components/base-components/avartar";
import {AvatarImage} from "@/components/ui/avatar";
import {RootState} from "@/stores";
import {GetBgColorFromFirstVowel} from "@/utilities/text-to-color";
import React from "react";
import {useSelector} from "react-redux";

const UserCard = () => {
  const {user} = useSelector((state: RootState) => state.users_data);
  return (
    <div className="max-h-[72px] h-full rounded-lg bg-white p-4 flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        {/* <img src={BgAuth.src} className="size-10 rounded-full" /> */}
        <Gavatar
          backgroundColor={GetBgColorFromFirstVowel(
            (user?.first_name && user?.first_name) || "A"
          )}
          rounded
          className="!size-10"
        >
          {(user?.first_name && user?.first_name?.[0]) || "A"}
        </Gavatar>
        <div className="flex flex-col w-full">
          <span className="text-sm font-semibold line-clamp-1 ">
            {(user?.first_name && user?.first_name) || ""}
          </span>
          <span className="text-xs font-semibold">Hang kim cuong</span>
        </div>
      </div>
      <img src={RankMember.src} alt="" className="max-w-12 w-full" />
    </div>
  );
};

export default UserCard;
