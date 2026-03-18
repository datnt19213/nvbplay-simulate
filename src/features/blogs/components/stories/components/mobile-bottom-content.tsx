import { StoryContentHeader } from "./content/story-content-header";
import { MobileCommentDrawer } from "./mobile-comment-drawer";

export const MobileBottomContent = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 py-1 px-3">
      <StoryContentHeader>
        <MobileCommentDrawer>
          <div>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center justify-start p-2 gap-3">
                <div className="text-base font-semibold text-white">
                  NVB Play
                </div>
                <div className="text-sm text-neutral-200 font-medium">
                  20 phút trước
                </div>
              </div>
            </div>
            <p className="text-sm font-normal text-neutral-200 line-clamp-2 mb-1 mx-2">
              Bạn đã bao giờ tự hỏi tại sao một số người chơi Pickleball lại có
              thể thực hiện những cú đánh chuẩn xác đến kinh ngạc?
            </p>
          </div>
        </MobileCommentDrawer>
      </StoryContentHeader>
    </div>
  );
};
