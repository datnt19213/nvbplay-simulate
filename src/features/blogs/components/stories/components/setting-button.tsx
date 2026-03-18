import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisIcon, TriangleAlert } from "lucide-react";
import React from "react";

export const SettingButton = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children ? (
          <div>{children}</div>
        ) : (
          <Button
            size={"icon"}
            className="bg-[#F5F5FA] rounded-full hover:bg-neutral-200"
          >
            <EllipsisIcon className="size-5 text-black" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="w-full flex flex-col justify-start items-start gap-0">
          <div className="w-full flex justify-start items-start gap-2 cursor-pointer p-3 hover:bg-neutral-200">
            <Image
              src="/images/blog/detail/bookmarks.svg"
              alt="Bookmark"
              width={20}
              height={20}
            />
            <div className="flex flex-col justify-start items-start gap-0">
              <p className="text-sm font-semibold text-neutral-900">
                Lưu bài viết
              </p>
              <p className="text-[0.75rem] text-[#64646D] font-medium">
                Lưu bài viết vào "Bài viết đã lưu" của bạn.
              </p>
            </div>
          </div>
          <div className="w-full flex justify-start items-start gap-2 cursor-pointer p-3 hover:bg-neutral-200">
            <TriangleAlert className="size-4" />
            <div className="flex flex-col justify-start items-start gap-0">
              <p className="text-sm font-semibold text-neutral-900">
                Báo xấu bài viết
              </p>
              <p className="text-[0.75rem] text-[#64646D] font-medium">
                Báo cáo nội dung không phù hợp.
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
