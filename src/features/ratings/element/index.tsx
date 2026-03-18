import {coin, Play} from "@/assets/icons";
import {Icon} from "@/components/common-components";
import {formatNumber} from "@/utilities/formator";
import {translate} from "@/utilities/translator";
import {ChevronRight} from "lucide-react";
import React, {FC} from "react";

type ImageMoreProps = {
  imgSrc: string;
  moreNumber: number;
  onHandleClick?: () => void;
};
export const ImageMore: FC<ImageMoreProps> = ({
  imgSrc,
  moreNumber,
  onHandleClick,
}) => {
  return (
    <div
      className="relative w-[106px] h-[106px] aspect-square cursor-pointer overflow-hidden rounded-lg"
      onClick={() => onHandleClick && onHandleClick()}
    >
      <div className="absolute top-0 left-0 w-full h-full flex text-white text-[18px] justify-center items-center bg-black/50 z-[2]">
        +{moreNumber}
      </div>
      <img src={imgSrc} alt="img" className="z-[1]" />
    </div>
  );
};
type VideoPlayProps = {
  imgSrc: string;
  onHandleClick?: () => void;
};
export const VideoPlay: FC<VideoPlayProps> = ({imgSrc, onHandleClick}) => {
  return (
    <div
      className="relative w-[106px] h-[106px] aspect-square cursor-pointer overflow-hidden rounded-lg"
      onClick={() => onHandleClick && onHandleClick()}
    >
      <img
        src={Play.src}
        alt=""
        className="z-[2] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <img src={imgSrc} alt="img" className="z-[1]" />
    </div>
  );
};
type ImageCommentProps = {
  imgSrc: string;
  onHandleClick?: () => void;
};
export const ImageComment: FC<ImageCommentProps> = ({
  imgSrc,
  onHandleClick,
}) => {
  return (
    <div
      className="relative w-[106px] h-[106px] aspect-square overflow-hidden rounded-lg"
      onClick={() => onHandleClick && onHandleClick()}
    >
      <img src={imgSrc} alt="img" className="z-[1]" />
    </div>
  );
};

type CommentReplyProps = {
  avtSrc: string;
  comment: any;
};
export const CommentReply: FC<CommentReplyProps> = ({avtSrc, comment}) => {
  return (
    <div className="flex gap-2">
      <div className="relative w-fit h-fit">
        <img
          src={avtSrc}
          alt="avt_img"
          className="min-w-8 min-h-8 rounded-full z-[1]"
        />
        <Icon
          icon="tabler:building-store"
          fontSize={12}
          className="rounded-full z-[2] absolute bottom-0 right-0 bg-black text-white p-0.5"
          fill="#fff"
        />
      </div>
      <div className="p-2 rounded-lg bg-gray-primary text-sm font-medium text-txtprimary leading-[21px]">
        {comment}
      </div>
    </div>
  );
};
type LCVProps = {
  data: any;
};
export const LCV: FC<LCVProps> = ({data}) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center gap-1">
        <Icon icon="tabler:thumb-up-filled" fontSize={20} color="#A6A6B0" />
        <span className="text-sm font-medium text-gray-icon">
          {formatNumber(12, {precision: 0})}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Icon icon="tabler:message-2-filled" fontSize={20} color="#A6A6B0" />
        <span className="text-sm font-medium text-gray-icon">
          {formatNumber(1, {precision: 0})}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Icon icon="tabler:eye-filled" fontSize={20} color="#A6A6B0" />
        <span className="text-sm font-medium text-gray-icon">
          {formatNumber(2500)}
        </span>
      </div>
    </div>
  );
};

type GetNVBCoinProps = {
  number: any;
};
export const GetNVBCoin: FC<GetNVBCoinProps> = ({number}) => {
  return (
    <div className="flex gap-3 items-center w-full bg-yellow-third pr-2 rounded-lg h-[45px] ">
      <div className="flex items-center w-full gap-2 px-4 py-2 cursor-pointer">
        <img src={coin.src} className="w-5" alt="coin" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{translate("received")}</span>
          <span className="text-orange-primary font-bold text-sm">
            {number}&nbsp;{translate("coin_nvb_loyalty")}
          </span>
        </div>
      </div>
      <ChevronRight size={24} className="text-orange-primary" />
    </div>
  );
};
