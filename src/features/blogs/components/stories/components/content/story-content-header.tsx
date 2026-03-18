import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SettingButton } from "../setting-button";

export const StoryContentHeader = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div>
      {children ? (
        <>{children}</>
      ) : (
        <>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center justify-start p-2 gap-3 bg-white">
              <div className="rounded-full overflow-hidden border border-neutral-100">
                <Avatar>
                  <AvatarImage src={"/images/blog/home/livestream-logo.png"} />
                  <AvatarFallback>NVB Play</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm font-semibold text-neutral-900">
                  NVB Play
                </p>
                <p className="text-[0.75rem] text-[#A6A6B0] font-medium">
                  20 phút trước
                </p>
              </div>
            </div>

            <SettingButton />
          </div>

          <div className="content">
            <p className="text-base font-normal text-neutral-900 my-3">
              Bạn đã bao giờ tự hỏi tại sao một số người chơi Pickleball lại có
              thể thực hiện những cú đánh chuẩn xác đến kinh ngạc?
            </p>
            <div className="flex items-center gap-2 text-[#0D5BB5] p-1 w-fit text-base mb-4">
              #NVBPlay
            </div>
          </div>
        </>
      )}
    </div>
  );
};
