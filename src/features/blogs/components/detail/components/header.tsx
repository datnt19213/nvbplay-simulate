import Image from "@/components/base-components/images/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDistanceToNowStrict } from "date-fns";
import { EllipsisIcon, TriangleAlert } from "lucide-react";
import { vi } from "date-fns/locale";

export const BlogDetailHeader = ({
  basicInfo,
  author,
  thumbnail,
}: {
  basicInfo: {
    id: string;
    status: string;
    name: string;
    slug: string;
    createdAt: string;
    totalComments: number;
    totalReactions: number;
  };
  author: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-start p-2 gap-3">
          <div className="rounded-full overflow-hidden border border-neutral-100">
            <Avatar>
              <AvatarImage
                src={author?.avatar || "/images/blog/home/livestream-logo.png"}
              />
              <AvatarFallback>{author?.name?.[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-sm font-semibold text-neutral-900">NVB Play</p>
            <p className="text-[0.75rem] text-[#A6A6B0] font-medium">
              {formatDistanceToNowStrict(basicInfo?.createdAt || new Date(), {
                addSuffix: true,
                locale: vi,
              })}
            </p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size={"icon"}
              className="bg-[#F5F5FA] rounded-full hover:bg-neutral-200"
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
      <div className="text-3xl font-semibold leading-[40px] my-6">
        {basicInfo?.name}
      </div>
      {/* <div className="relative w-full aspect-square rounded-lg overflow-hidden md:max-h-[23.75rem]">
        <Image
          src={thumbnail || "/images/blog/home/livestream-logo.png"}
          alt={basicInfo?.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div> */}
    </>
  );
};
