import { StoryContentHeader } from "../content/story-content-header";
import { StoryCommentAction } from "./story-comment-action";
import { StoryListComment } from "./story-list-comment";

export const StoryComment = () => {
  return (
    <div className="relative h-screen overflow-y-scroll scrollbar-none">
      {/* Header */}
      <div className="">
        <StoryContentHeader />
      </div>

      {/* Action */}
      <StoryCommentAction />

      {/* List comment */}
      <StoryListComment />
    </div>
  );
};
