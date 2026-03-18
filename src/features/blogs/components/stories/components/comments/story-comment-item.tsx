import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, MoreHorizontalIcon, Trash2, UserIcon } from "lucide-react";
import React from "react";

export const StoryCommentItem = () => {
  return (
    <div>
      <div className="w-full flex justify-start overflow-hidden overflow-x-scroll scrollbar-none items-start gap-2">
        <Avatar>
          <AvatarImage src="/images/live1.png" />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>

        <div className="w-full flex flex-col justify-start items-start gap-1">
          <div className="w-full border border-neutral-200 bg-[#EBEBF0] rounded-lg p-2">
            <div className="flex justify-between items-center">
              <div className="text-black font-semibold text-base">NVB Play</div>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="text-neutral-500 font-semibold text-sm cursor-pointer">
                    <MoreHorizontalIcon className="size-4" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-fit">
                  <div className="w-full flex flex-col justify-start items-start gap-0">
                    <div className="w-full flex justify-start items-start gap-2 cursor-pointer p-3 hover:bg-neutral-200">
                      <Edit2 className="size-4" />
                      <div className="flex flex-col justify-start items-start gap-0">
                        <p className="text-sm font-semibold text-neutral-900">
                          Cập nhật comment
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-start items-start gap-2 cursor-pointer p-3 hover:bg-neutral-200">
                      <Trash2 className="size-4 text-red-700" />
                      <div className="flex flex-col justify-start items-start gap-0">
                        <p className="text-sm font-semibold text-red-700">
                          Xóa comment
                        </p>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-neutral-900 font-normal text-sm">
              Bạn đã bao giờ tự hỏi tại sao một số người chơi Pickleball lại có
              thể thực hiện những cú đánh chuẩn xác đến kinh ngạc?
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-start gap-5">
              <div className="text-neutral-500 font-semibold text-sm">
                20 phút trước
              </div>
              <div className="text-neutral-500 font-semibold text-sm">
                Thích
              </div>
              <div className="text-neutral-500 font-semibold text-sm cursor-pointer">
                Trả lời
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
