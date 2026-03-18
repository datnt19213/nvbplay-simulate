import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const StoryCommentAction = () => {
  return (
    <div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#db2f41] p-1 rounded-full overflow-hidden">
            <Image src="/images/blog/home/heart.png" alt="" />
          </div>
          <span className="text-sm font-medium text-neutral-500">125</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-sm font-medium text-neutral-500 -mt-[2px]">
              50 bình luận
            </span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-sm font-medium text-neutral-500">
              20 lượt Chia sẻ
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-neutral-100 my-2" />

      {/* Button control */}
      <div className="w-full px-4 bg-white">
        <div className="w-full flex justify-center items-center gap-2">
          <Button variant={"ghost"} className="w-full flex items-center gap-2">
            <Heart className="size-4 font-medium text-neutral-500" />
            <span className="text-sm font-medium text-neutral-500">Thích</span>
          </Button>

          <Button variant={"ghost"} className="w-full flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="size-4 font-medium text-neutral-500"
            >
              <path
                fill="currentColor"
                d="m236.24 107.76l-80-80A6 6 0 0 0 146 32v42.2c-54.48 3.59-120.39 55-127.93 120.66a10 10 0 0 0 17.23 8C46.56 190.85 87 152.6 146 150.13V192a6 6 0 0 0 10.24 4.24l80-80a6 6 0 0 0 0-8.48M158 177.52V144a6 6 0 0 0-6-6c-27.73 0-54.76 7.25-80.32 21.55a193.4 193.4 0 0 0-40.81 30.65c4.7-26.56 20.16-52 44-72.27C98.47 97.94 127.29 86 152 86a6 6 0 0 0 6-6V46.49L223.51 112Z"
              />
            </svg>
            <span className="text-sm font-medium text-neutral-500">
              Chia sẻ
            </span>
          </Button>
        </div>
      </div>

      <div className="w-full h-[1px] bg-neutral-100 my-2" />
    </div>
  );
};
