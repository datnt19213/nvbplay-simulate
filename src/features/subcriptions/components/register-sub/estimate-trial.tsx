import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

export const EstimateTrial = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-900 font-semibold md:text-neutral-300 md:font-medium mb-3">
          Thời hạn dùng thử miễn phí
        </div>
        <ChevronDown className="size-4 text-neutral-800 block md:hidden" />
      </div>
      <div className="space-y-6">
        <div className="flex items-start gap-2">
          <div className="relative">
            <div className="aspect-square size-5">
              <Image
                src="/images/subcription/unlocked.svg"
                alt="unlock"
                width={20}
                height={20}
              />
            </div>
            <div className="absolute top-[100%] left-0 right-0">
              <DotLine numberOfDots={7} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-sm text-neutral-900 md:text-neutral-300 font-semibold">
              Ngày hôm nay
            </div>
            <div className="text-sm text-neutral-700 md:text-neutral-500 font-medium">
              Trở thành hội viên NVB Play, áp dụng toàn bộ các đặc quyền của hội
              viên.
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="relative">
            <div className="aspect-square size-5">
              <Image
                src="/images/subcription/bell.svg"
                alt="bell"
                width={20}
                height={20}
              />
            </div>
            <div className="absolute top-[100%] left-0 right-0">
              <DotLine numberOfDots={6} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-sm md:text-neutral-300 text-neutral-900 font-semibold">
              Ngày thứ 28
            </div>
            <div className="text-sm md:text-neutral-500 text-neutral-700 font-medium">
              Nhận thông báo khi gần hết hạn dùng thử
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="aspect-square size-5">
            <Image
              src="/images/subcription/check.svg"
              alt="bell"
              width={20}
              height={20}
              className="z-10"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-sm md:text-neutral-300 text-neutral-900 font-semibold">
              Ngày thứ 30
            </div>
            <div className="text-sm md:text-neutral-500 text-neutral-700 font-medium">
              Gói sẽ tự động gia hạn với giá 650.000 đ/ 12 tháng. Nếu không muốn
              tiếp tục sử dụng, hãy hủy trước khoảng thời gian này.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DotLine = ({
  className,
  numberOfDots = 5,
}: {
  className?: string;
  numberOfDots?: number;
}) => {
  return (
    <div
      className={cn(
        "h-full flex flex-col items-center justify-between gap-1 z-[1] ",
        className
      )}
    >
      {Array(numberOfDots || 5)
        .fill(1)
        .map((_, index) => (
          <div key={index} className="w-[0.0625rem] h-1 bg-neutral-700" />
        ))}
    </div>
  );
};
