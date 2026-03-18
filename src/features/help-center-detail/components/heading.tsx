import { Clock2 } from "lucide-react";
import React from "react";

export const Heading = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">
        [Hội viên] Chương trình hội NVB Play là gì?
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span className="text-neutral-500">
            <Clock2 className="size-5" />
          </span>
          <span>11 tháng 4, 2024</span>
        </div>
      </div>
    </div>
  );
};
