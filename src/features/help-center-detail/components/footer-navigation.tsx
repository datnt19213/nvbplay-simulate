import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const FooterNavigation = () => {
  return (
    <div className="bg-white rounded-lg py-4 px-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 flex flex-col justify-start items-start gap-1 cursor-pointer">
          <div className="flex justify-start items-center gap-1 md:gap-4">
            <ChevronLeft className="size-4 text-neutral-500" />
            <div className="text-neutral-500 font-semibold text-sm">
              Bài viết trước
            </div>
          </div>
          <Link href={`/help-center`}>
            <div className="text-neutral-900 font-semibold text-base line-clamp-2">
              [Hội viên] Chương trình hội NVB Play là gì?
            </div>
          </Link>
        </div>
        <div className="w-[1px] h-[80px] bg-neutral-100 mr-6" />
        <div className="flex-1 flex flex-col justify-start items-start gap-1 cursor-pointer">
          <div className="flex justify-start items-center gap-1 md:gap-4">
            <div className="text-neutral-500 font-semibold text-sm">
              Bài viết tiếp theo
            </div>
            <ChevronRight className="size-4 text-neutral-500" />
          </div>
          <Link href={`/help-center`}>
            <div className="text-neutral-900 font-semibold text-base line-clamp-2">
              [Hội viên] Chương trình hội NVB Play là gì?
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
