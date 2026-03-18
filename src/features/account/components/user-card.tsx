import {subcription} from "@/assets/icons";
import {bg_user} from "@/assets/images";
import NoUser from "@/components/base-components/cta/no-user";
import Image from "@/components/base-components/images/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ENUM} from "@/configs";
import {GetACookie} from "@/utilities/cookies";
import {DecryptBasic} from "@/utilities/hash-aes";
import {isTokenValid} from "@/utilities/token";
import React from "react";

const UserCard = () => {
  return (
    <div className="h-[8.25rem] relative p-4 flex items-end w-full">
      <Image className="absolute inset-0 z-[-1]" src={bg_user.src} />
      {/* TITLE */}
      <div className="flex gap-2 items-center justify-between w-full">
        <Avatar className="size-12 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full text-white">
          <p className="text-base">Xin chào,</p>
          <div className="text-lg font-semibold flex justify-between items-center">
            <h5>User Name #11042024</h5>
            <Image src={subcription.src} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
