"use client";

import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import React from "react";

interface ReactionItemProps {
  reaction: any;
  typeReaction: boolean;
  reactionCount: number;
  onClick: () => void;
}

export const ReactionItem = React.memo(
  ({ reaction, typeReaction, reactionCount, onClick }: ReactionItemProps) => {
    return (
      <div
        className={cn(
          "transition-all hover:-translate-y-2 hover:scale-[1.4] w-[1.875rem] h-[1.875rem] cursor-pointer relative z-[5]",
          typeReaction && "scale-[1.4]"
        )}
        onClick={onClick}
      >
        <Lottie
          animationData={reaction.reaction}
          loop={typeReaction}
          autoplay={true}
        />
        {/* <div className="absolute -bottom-4 -right-0">
          <div className="bg-neutral-100 rounded-full w-5 h-5 p-1 z-[1] flex justify-center items-center">
            <div className="text-sm">{reactionCount}</div>
          </div>
        </div> */}
      </div>
    );
  }
);

ReactionItem.displayName = "ReactionItem";
