import React from "react";

const MyOrdersSkeleton = () => {
  return (
    <div className="relative w-full h-fit flex flex-col overflow-hidden rounded-lg bg-white">
      <div className="absolute left-0 top-0 z-[2] h-full w-full animate-slide-infinite bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      <div className="relative z-[1] flex items-center justify-between p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          <div className="h-7 w-7 rounded-full bg-gray-200"></div>
          <span className="h-4 w-16 rounded bg-gray-200"></span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          <div className="h-6 w-6 bg-gray-200"></div>
          <span className="h-4 w-16 rounded bg-gray-200"></span>
        </div>
      </div>
      <div className="relative z-[1] flex flex-col gap-8 px-4 pb-4">
        <div className="h-24 w-full rounded bg-gray-200"></div>
        <div className="h-24 w-full rounded bg-gray-200"></div>
      </div>
      <div className="relative z-[1] flex w-full flex-col gap-2">
        <div className="border-gray-border flex justify-between border-t p-4 text-sm">
          <div>
            <span className="h-4 w-24 rounded bg-gray-200"></span>
          </div>
          <div>
            <span className="h-4 w-24 rounded bg-gray-200"></span>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="h-8 w-24 rounded-lg bg-gray-200"></div>
          <div className="h-8 w-24 rounded-lg bg-gray-200"></div>
        </div>
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="h-11 w-full rounded-lg bg-gray-200 p-3"></div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersSkeleton;
