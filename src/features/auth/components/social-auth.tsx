import {Zalo, Telegram} from "@/assets/icons";
import {Icon} from "@/components/common-components";
import {Button} from "@/components/ui/button";
import React from "react";

const SocialAuth = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant={"outline"}
        size={"icon"}
        className="!rounded-full min-h-12 aspect-square min-w-12 size-12"
      >
        <Icon icon="devicon:google" fontSize={24} />
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        className="!rounded-full min-h-12 aspect-square min-w-12 size-12 flex items-center justify-center"
      >
        <img src={Zalo.src} alt="" className="size-6" />
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        className="!rounded-full min-h-12 aspect-square min-w-12 size-12 bg-txtprimary hover:!bg-txtprimary"
      >
        <Icon icon="devicon:apple" fontSize={24} fill="#ffffff" />
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        className="!rounded-full min-h-12 aspect-square min-w-12 size-12 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] flex justify-center items-center"
      >
        <img src={Telegram.src} alt="" className="size-6" />
      </Button>
    </div>
  );
};

export default SocialAuth;
