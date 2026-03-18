"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

const TabDeal = () => {
  const [currentTab, setCurrentTab] = useState<"now" | "future">("now");

  return (
    <div className="px-0 desktop:px-4 flex items-center">
      {/* Tab: Now */}
      <div
        onClick={() => setCurrentTab("now")}
        className={cn(
          "flex flex-col items-center justify-center border-b px-2.5 desktop:px-4 py-2 cursor-pointer",
          {
            "border-b-primary bg-gradient-to-b from-[#FF3F1A]/0 to-[#FF3F1A]/20":
              currentTab === "now",
            "border-b-transparent": currentTab !== "now",
          }
        )}
      >
        <h6
          className={cn("text-base desktop:text-lg  font-medium", {
            "text-primary": currentTab === "now",
            "text-gray-600": currentTab !== "now",
          })}
        >
          10:00
        </h6>
        <p
          className={cn("text-xs text-center desktop:text-sm", {
            "text-foreground": currentTab === "now",
            "text-gray-500": currentTab !== "now",
          })}
        >
          Đang diễn ra
        </p>
      </div>

      {/* Tab: Future */}
      <div
        onClick={() => setCurrentTab("future")}
        className={cn(
          "flex flex-col items-center justify-center border-b px-2.5 desktop:px-4 py-2 cursor-pointer",
          {
            "border-b-primary bg-gradient-to-b from-[#FF3F1A]/0 to-[#FF3F1A]/20":
              currentTab === "future",
            "border-b-transparent": currentTab !== "future",
          }
        )}
      >
        <h6
          className={cn("text-base desktop:text-lg  font-medium", {
            "text-primary": currentTab === "future",
            "text-gray-600": currentTab !== "future",
          })}
        >
          13:00
        </h6>
        <p
          className={cn("text-xs text-center desktop:text-sm", {
            "text-foreground": currentTab === "future",
            "text-gray-500": currentTab !== "future",
          })}
        >
          Sắp diễn ra
        </p>
      </div>
    </div>
  );
};

export default TabDeal;
