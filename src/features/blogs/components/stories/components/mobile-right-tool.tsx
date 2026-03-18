import Image from "@/components/base-components/images/image";
import {
  EllipsisIcon,
  Heart,
  MessageSquareMoreIcon
} from "lucide-react";
import { SettingButton } from "./setting-button";

const menuAction = [
  {
    icon: <Heart className="size-6 stroke-white fill-white" />,
    label: "120",
  },
  {
    icon: <MessageSquareMoreIcon className="size-6 stroke-white fill-white" />,
    label: "0",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="size-6 stroke-white fill-white"
      >
        <path
          fill="currentColor"
          d="M12 6V2l7 7l-7 7v-4c-5 0-8.5 1.5-11 5l.8-3l.2-.4A12 12 0 0 1 12 6"
        />
      </svg>
    ),
    label: "0",
  },
  {
    icon: (
      <SettingButton>
        <EllipsisIcon className="size-6 stroke-white fill-white" />
      </SettingButton>
    ),
  },
];

export const MobileRightTool = () => {
  const renderStories = () => {
    return (
      <div className="flex items-center rounded overflow-hidden text-[10px] uppercase text-sm text-white font-medium">
        <div className="relative border-2 border-[#FF3F1A] rounded-full overflow-hidden">
          <Image
            src={
              "https://s3-alpha-sig.figma.com/img/62a7/76a5/3c3011444d7dd93c3ffb02bd3ad4d3b5?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OX5EKuqRFi3jmUcmZVp3CMfpF~n22tnJ9wdNJV7Kd5-xZoD0EH6sqF0sg-BbjUdTlrbp55kk7zLhr01Rz76gy0KA7-5poVf8kxzW6c4bc6GN3u137lAOSX0hGXOGEeQiyqVY5OXqjM5bEQgN3CI6r0zjCSRn9bPbq7UU5pSskyG6t~XvTI3NezdyyKbFTEHqp7aQ-LMMG9x0GVZB4fUBKHGa~p9NMKhIHcScuGS19p4A7cor9g3lgUEKGaUrzFLXkfsZces~ZhkkRBW-FTdC2nc0OEjeoK9l5q2ScQALXdeKYitmfCB-4sBrCwh9TA71brN-y5bnfwfrpvvPKZrwuA__"
            }
            className="size-10"
            alt={""}
          />
        </div>
      </div>
    );
  };

  const renderMenuAction = () => {
    return (
      <div className="flex flex-col gap-4 justify-end items-end">
        {menuAction?.map((item, index) => (
          <div
            key={index}
            className="ml-[10px] flex flex-col justify-end items-center gap-2 text-white cursor-pointer"
          >
            {item.icon}
            <p className="text-xs text-white font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-4 mt-10 flex flex-col gap-4 justify-start items-start">
      {renderStories()}
      {renderMenuAction()}
    </div>
  );
};
