"use client";

import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useReturnReason } from "@/hooks/queries/claims";
import { IReturnReason } from "@/types/claims";
import { RefreshCcwDot } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

// const CancelReason = [
//   {
//     id: 1,
//     name: "Tôi muốn thay đổi phương thức thanh toán",
//   },
//   {
//     id: 2,
//     name: "Tôi muốn thay đổi mã giảm giá/ưu đãi",
//   },
//   {
//     id: 3,
//     name: "Tôi không còn nhu cầu",
//   },
//   {
//     id: 4,
//     name: "Tôi muốn thay đổi địa chỉ nhận hàng",
//   },
//   {
//     id: 5,
//     name: "Tôi tìm được chổ mua khác có giá tốt hơn",
//   },
//   {
//     id: 6,
//     name: "Tôi muốn thuộc tính thay đổi sản phẩm (màu sắc, số lượng, ...)",
//   },
//   {
//     id: 7,
//     name: "Khác",
//   },
// ];

export const CancelOrderModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useReturnReason();

  return (
    <DialogResponsive
      trigger={children}
      open={open}
      setOpen={setOpen}
      dialogClassname="h-fit"
      sheetClassname="w-full"
    >
      <div className="relative w-full flex flex-col justify-start items-start">
        <div className="w-full flex justify-center items-center">
          <div className="text-lg font-semibold mt-2">Hủy đơn hàng</div>
        </div>

        <div className="w-full h-[1px] bg-neutral-300 my-2" />

        <div className="w-full h-full p-4 mb-20">
          <div className="bg-blue-500/10 dark:bg-blue-600/20 border-0 rounded-none p-3">
            <div className="flex items-start gap-2">
              <Image src="/light.svg" alt="light" width={24} height={24} />
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-[#0D5BB5] text-sm ">
                  Mẹo:
                </div>
                <div className="text-sm font-medium ">
                  Bạn có thể thay đổi địa chỉ nhận hàng khi đơn hàng chưa được
                  gửi cho đơn vị vận chuyển.
                </div>
                <div className="flex justify-end items-center gap-1">
                  <RefreshCcwDot className="text-[#0D5BB5] stroke-[#0D5BB5] size-4" />
                  <div className="text-sm font-semibold text-[#0D5BB5] cursor-pointer">
                    Thay đổi địa chỉ
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[280px] md:h-fit overflow-y-scroll scrollbar-thin">
            <RadioGroup
              defaultValue="1"
              className="w-full grid grid-cols-1 gap-4 mt-6"
            >
              {data?.map((item: IReturnReason) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={item.value}
                    id={`r1-vertical-${item.id}`}
                    className="text-blue-700 border-neutral-400 [&_svg]:fill-blue-500 border-none bg-neutral-400/25"
                  />
                  <Label
                    htmlFor={`r1-vertical-${item.id}`}
                    className="text-sm text-neutral-700"
                  >
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right w-full p-3 bg-white border-t border-neutral-300">
          <Button className="w-full">Tiếp tục</Button>
        </div>
      </div>
    </DialogResponsive>
  );
};
