import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Images, Smile } from "lucide-react";

const listColor = [
  { first: "#064D9D", second: "#1A92D2" },
  { first: "#6D51A5", second: "#ED60A5" },
  { first: "#FF3F1A", second: "#F09840" },
  { first: "#1E1E1E", second: "#474747" },
  { first: "#0AC958", second: "#216270" },
  { first: "#000000", second: "#000000" },
  { first: "#FFFFFF", second: "#FFFFFF" },
];

export const StoryContent = ({
  content,
  setContent,
  selectedColor,
  setSelectedColor,
  activeChooseColor,
  setActiveChooseColor,
  isMobile,
}: {
  content: string;
  setContent: (value: string) => void;
  selectedColor: { first: string; second: string };
  setSelectedColor: (color: { first: string; second: string }) => void;
  activeChooseColor: boolean;
  setActiveChooseColor: (value: boolean) => void;
  isMobile: boolean;
}) => {
  return (
    <div className="flex flex-col justify-start items-start gap-4 overflow-y-scroll scrollbar-thin mb-28 md:mb-0">
      <div className="flex items-center gap-3">
        <Image
          src={"/images/blog/home/livestream-logo.png"}
          alt=""
          className="size-8 rounded-full border border-neutral-100"
        />
        <div className="text-base font-semibold">NVB Play</div>
      </div>

      <div
        className={cn(
          "group-create-story-modal w-full border border-neutral-200 rounded-lg p-2"
        )}
        style={{
          background: `linear-gradient(to bottom, ${selectedColor.first}, ${selectedColor.second})`,
        }}
      >
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Hãy viết nội dung cho câu chuyện của bạn"
          rows={isMobile ? 10 : 5}
          className={cn(
            "border-none outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none bg-transparent",
            selectedColor.first !== "#FFFFFF" &&
              "text-white placeholder:text-neutral-200"
          )}
        />

        <div className="flex items-center gap-2 bg-[#DBEEFF] p-1 w-fit text-base mb-4">
          #NVBPlay
        </div>

        <div className="flex items-center justify-between">
          {!activeChooseColor ? (
            <Image
              src={"/images/blog/home/stories/bg-mode.png"}
              alt=""
              className="cursor-pointer"
              onClick={() => setActiveChooseColor(!activeChooseColor)}
            />
          ) : (
            <div className="flex items-center gap-2">
              <div
                className="size-8 rounded-lg border border-neutral-200 cursor-pointer"
                onClick={() => {
                  setActiveChooseColor(false);
                  setSelectedColor({ first: "#FFFFFF", second: "#FFFFFF" });
                }}
              >
                <Image
                  src={"/images/blog/home/stories/clear-bg-mode.png"}
                  alt=""
                  className="cursor-pointer"
                />
              </div>
              {listColor.map((color, index) => (
                <div
                  key={index}
                  className="size-8 rounded-lg border border-neutral-200 cursor-pointer"
                  style={{
                    background: `linear-gradient(to bottom, ${color.first}, ${color.second})`,
                  }}
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Images
              className={cn(
                "size-5 cursor-pointer text-neutral-500",
                selectedColor.first !== "#FFFFFF" && "text-white"
              )}
            />
            <Smile
              className={cn(
                "size-5 cursor-pointer text-neutral-500",
                selectedColor.first !== "#FFFFFF" && "text-white"
              )}
            />
          </div>
        </div>
      </div>

      <div className="w-full fixed md:static bottom-0 left-0 right-0 py-2 px-4 md:py-0 md:px-0 mt-0 md:mt-6 shadow-lg md:shadow-none bg-white md:bg-transparent">
        <Button className="w-full" disabled={content.length === 0}>
          Đăng bài
        </Button>
      </div>
    </div>
  );
};
