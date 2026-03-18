import React from "react";

const AddressesSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg relative overflow-hidden">
      <div className="absolute left-0 top-0 z-[2] h-full w-full animate-slide-infinite bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      <div className="flex justify-between">
        <div className="font-semibold flex items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <hr className="h-5 w-[1px] bg-gray-border" />
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="p-3 h-10 w-10 aspect-square bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default AddressesSkeleton;
