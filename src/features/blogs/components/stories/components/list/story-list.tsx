import React from "react";
import { CreateStoryModal } from "../../../home/components/stories/create-story-modal";
import Image from "@/components/base-components/images/image";
import { PlusIcon } from "lucide-react";
import { COMMON_DATA } from "@/configs";

export const StoryList = () => {
  const createStory = () => {
    return (
      <CreateStoryModal>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="relative border-2 border-white rounded-full w-fit">
            <Image
              src={"/images/blog/home/create-story.jpg"}
              className="size-14 rounded-full"
              alt={"create-story"}
            />
            <div className="bg-white p-[2px] w-6 h-6 absolute -bottom-4 left-4 right-0 rounded-full flex items-center justify-center">
              <PlusIcon className="size-4 text-[#FF3F1A] font-bold" strokeWidth={2} />
            </div>
          </div>

          {/* INFO */}
          <div className="mt-6">
            <p className="text-sm text-center line-clamp-2 text-white">
              Tạo mới
            </p>
          </div>
        </div>
      </CreateStoryModal>
    );
  };

  const renderStories = () => {
    return (
      <>
        {COMMON_DATA.live.map((live, index) => (
          <div
            key={index}
            className="flex items-center rounded overflow-hidden text-[10px] uppercase text-sm text-white font-medium"
          >
            <div className="relative border-2 border-[#FF3F1A] rounded-full overflow-hidden">
              <Image src={live.image} className="size-10" alt={live.name} />
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="transition-all relative grid grid-cols-1 place-items-center place-content-center gap-4">
      <div className="mt-6">{createStory()}</div>
      <div className="w-full h-[1px] bg-neutral-800 my-4" />
      <div className="mx-auto space-y-6 h-[90vh] overflow-hidden overflow-y-scroll scrollbar-none">
        {renderStories()}
      </div>
    </div>
  );
};
