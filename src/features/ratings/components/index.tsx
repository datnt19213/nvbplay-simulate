import {
  Delivered,
  Delivering,
  WaitExec,
  RollbackRequest,
  WaitPayment,
  Cancel,
  coin,
  badge_logo,
} from "@/assets/icons";
import {Batminton, Logo} from "@/assets/images";
import {Icon} from "@/components/common-components";
import {Button} from "@/components/ui/button";
import ProductItem from "@/features/checkout/elements/product-item";
import {cn} from "@/lib/utils";
import {formatDateToDDMMYYYY} from "@/utilities/date";
import {CapitalizeFirstLetter, FormatCurrency} from "@/utilities/text";
import {translate} from "@/utilities/translator";
import React, {FC, HTMLAttributes} from "react";
import {
  CommentReply,
  GetNVBCoin,
  ImageComment,
  ImageMore,
  LCV,
  VideoPlay,
} from "../element";

type RatingItemProps = {
  status:
    | "pending"
    | "completed"
    | "draft"
    | "archived"
    | "canceled"
    | "requires_action";

  isRating?: boolean;
  data: any;
} & HTMLAttributes<HTMLDivElement>;

export const RatingsItem: FC<RatingItemProps> = ({
  data,
  status,
  isRating,
  ...props
}) => {
  const color =
    status === "completed" || status === "archived" || status === "canceled"
      ? "primary"
      : status === "draft" || status === "requires_action"
        ? "secondary"
        : status === "pending" && "dark";
  const textColor =
    status === "completed" || status === "archived"
      ? "text-green-primary"
      : status === "draft" || status === "requires_action"
        ? "text-txtsecondary"
        : status === "pending"
          ? "text-yellow-primary"
          : status === "canceled" && "text-red-primary";
  const btnText =
    status === "completed"
      ? "Đánh giá"
      : status === "archived"
        ? "Mua thêm"
        : status === "canceled"
          ? "Mua lại"
          : status === "draft"
            ? "Huỷ đơn"
            : status === "requires_action"
              ? "Xem chi tiết"
              : status === "pending" && "Thanh toán";
  const imgSrc =
    status === "completed"
      ? Delivered.src
      : status === "archived"
        ? Delivering.src
        : status === "canceled"
          ? Cancel.src
          : status === "draft"
            ? WaitExec.src
            : status === "requires_action"
              ? RollbackRequest.src
              : status === "pending" && WaitPayment.src;

  return (
    <div
      {...props}
      className="flex flex-col bg-white overflow-hidden rounded-lg animate-fade-up"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-border">
        <div className="flex gap-2 items-center text-sm font-semibold text-gray-fifth">
          <img
            src={Logo.src}
            alt="logo"
            className="rounded-full h-7 w-7 aspect-square"
          />
          <span>NVB Play</span>
        </div>
        <div
          className={cn(
            "flex gap-2 items-center font-semibold text-sm",
            textColor
          )}
        >
          <img src={imgSrc} className="w-6 h-6" />
          <span>{CapitalizeFirstLetter(translate(status))}</span>
        </div>
      </div>
      <div className="flex flex-col gap-8 py-2 px-4">
        <ProductItem
          item={{
            thumbnail: Batminton.src,
            product_title: "Áo cầu lông",
            title: "Áo cầu lông",
            unit_price: 190000,
            total: 1900000,
            quantity: 10,
          }}
        />
      </div>
      <div className="w-full flex items-center justify-end gap-3 p-4 border-t border-gray-border">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-icon">
          {translate("the_remaining_time_for_evaluation")}:
          <span className="font-semibold">16 {translate("date")}</span>
        </div>
        <Button
          className={cn(
            "rounded-lg text-sm font-semibold bg-txtthird hover:bg-txtthird text-white"
          )}
        >
          {translate("review")} +200{" "}
          <img src={coin.src} className="h-6 w-6 aspect-square" alt="" />
        </Button>
      </div>
    </div>
  );
};

type ReviewedItemProps = {
  data: any;
} & HTMLAttributes<HTMLDivElement>;

export const ReviewedItem: FC<ReviewedItemProps> = ({data, ...props}) => {
  return (
    <div
      {...props}
      className="flex flex-col desktop:flex-row w-full p-5 rounded-lg bg-white gap-10 animate-fade-up"
    >
      <div className="max-w-full desktop:max-w-[328px] w-full flex flex-col gap-4">
        <div className="w-full h-[58px] bg-gray-primary rounded-lg border border-gray-primary flex items-center gap-2">
          <div className="w-[58px] h-[58px] overflow-hidden bg-white flex items-center justify-center rounded-lg">
            <img
              src={Batminton.src}
              className="h-full w-auto object-cover"
              alt="img"
            />
          </div>
          <span className="text-sm font-medium text-txtprimary">
            Áo cầu lông DS DS23-01
          </span>
        </div>
        <div className="w-full flex flex-row  desktop:flex-col gap-1">
          <span className="text-sm font-medium text-txtsecondary">
            {translate("classify")}:
          </span>
          <span className="text-sm font-medium text-txtprimary">
            L (1m65-1m75, 65-75 kg), Đen trắng
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center w-fit gap-0.5">
            {Array.from({length: 5}).map((_, index) => (
              <Icon
                key={index}
                icon="ph:star-fill"
                fontSize={20}
                color="#FFC400"
                className="text-yellow-secondary"
              />
            ))}
          </div>
          <span className="font-medium text-sm text-gray-icon">
            11/04/2024 16:30
          </span>
        </div>
        <div className="flex items-center gap-2 w-full">
          <VideoPlay imgSrc={Batminton.src} />
          <ImageComment imgSrc={Batminton.src} />
          <ImageMore imgSrc={Batminton.src} moreNumber={2} />
        </div>
        <span className="text-sm font-medium text-txtprimary">
          Áo còn chỉ thừa ở vị trí cổ áo, hình in bị bông trốc, chất liệu vải
          hơi dày. 😀😀😀
        </span>
        <div className="flex flex-col w-full gap-2">
          <span className="text-txtsecondary text-sm font-semibold">
            {translate("seller_feedback")}:
          </span>
          <CommentReply
            avtSrc={badge_logo.src}
            comment="Cảm ơn ct đã đánh giá sản phẩm, nếu sản phẩm có gặp vấn đề khi sử dụng, hãy liên hệ với shop ngay nhé. Hotline: 012131649."
          />
        </div>
        <div className="flex justify-between w-full items-center">
          <LCV data={undefined} />
          <div className="flex items-center gap-1 px-4 py-2 cursor-pointer">
            <span className="text-sm font-semibold text-txtthird">
              {translate("edit")}
            </span>
            <Icon icon="tabler:edit" fontSize={20} color="#FF3F1A" />
          </div>
        </div>
        <GetNVBCoin number={200} />
      </div>
    </div>
  );
};
