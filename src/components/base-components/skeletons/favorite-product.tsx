import React from "react";
import {ShimmerLoad} from "./element";

const FavoriteSkeleton = () => {
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-white relative overflow-hidden">
      <ShimmerLoad />
      <div className="flex items-center justify-center p-3 h-full aspect-square">
        <div className="bg-gray-200 overflow-hidden rounded-lg h-[158px] w-[158px]"></div>
      </div>
      <div className="h-full w-full p-3 pl-0 flex flex-col justify-between">
        <div className="flex gap-3 w-full">
          <div className="flex flex-col w-full items-start gap-2">
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="flex w-full items-center justify-start text-gray-icon">
              <span className="fontmedium text-xs">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </span>
            </div>
          </div>
          <div className="h-6 w-6 aspect-square cursor-pointer rounded-full bg-gray-primary flex items-center justify-center"></div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col w-full">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </div>
          <div className="h-10 w-10 aspect-square rounded-full flex items-center justify-center bg-gray-200 cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteSkeleton;
