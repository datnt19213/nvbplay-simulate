import React from "react";
import { StoryCommentItem } from "./story-comment-item";
import { StoryCommentCreate } from "./story-comment-create";

export const StoryListComment = () => {
  return (
    <div>
      <StoryCommentCreate />

      <div className="grid grid-cols-1 gap-4 mt-3">
        <StoryCommentItem />
        <div className="pl-12 space-y-4">
          <StoryCommentItem />
          <StoryCommentItem />
        </div>
      </div>
    </div>
  );
};
