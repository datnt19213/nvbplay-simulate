import React from "react";
import { StoryContentMainView } from "./story-content-main-view";
import { StoryContentActionControl } from "./story-content-action-control";
import { MobileRightTool } from "../mobile-right-tool";
import { MobileBottomContent } from "../mobile-bottom-content";

export const StoryContent = ({ image }: { image?: string }) => {
  return (
    <div className="relative w-full h-full grid grid-cols-1 place-items-center place-content-center">
      <StoryContentMainView image={image} />

      {/* Right action control */}
      <StoryContentActionControl />

      <div className="block md:hidden">
        <MobileRightTool />
        <MobileBottomContent />
      </div>
    </div>
  );
};
