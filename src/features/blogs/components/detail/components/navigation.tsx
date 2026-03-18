import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, EllipsisIcon, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { ShareBlog } from "./share-blog";

export const Navigation = () => {
  return (
    <div className="block md:hidden bg-white rounded-lg px-4 py-2 mb-2 w-full">
      <div className="w-full flex justify-between items-center">
        {/* Back Arrow */}
        <Link href={"/blogs"}>
          <ChevronLeft className="size-5" />
        </Link>

        {/* Centered Content */}
        <div className="flex items-center justify-center gap-3">
          <ShareBlog />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="rounded-full"
              >
                <EllipsisIcon className="size-5 text-black" />
              </Button>
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
        </div>
      </div>
    </div>
  );
};
