export const BlogCardSkeleton = () => {
  return (
    <div className="border border-neutral-200 overflow-hidden rounded-lg !p-0 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-start p-2 gap-3 bg-white">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-200 rounded" />
          <div className="w-20 h-3 bg-gray-200 rounded" />
        </div>
      </div>
      {/* Image placeholder */}
      <div className="w-full h-[15.625rem] md:h-[25rem] bg-gray-200" />
      {/* Content */}
      <div className="flex flex-col justify-start items-start gap-3 py-2 px-6 bg-white">
        <div className="w-3/4 h-5 bg-gray-200 rounded" />
        <div className="hidden md:flex flex-col gap-2 w-full">
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="w-2/3 h-4 bg-gray-200 rounded" />
        </div>
        {/* Reactions count */}
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <div className="w-8 h-4 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="w-6 h-4 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="w-6 h-4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
      {/* Button controls */}
      <div className="w-full px-4 py-2 bg-white">
        <div className="w-full flex justify-center items-center gap-2">
          <div className="w-full h-9 bg-gray-200 rounded" />
          <div className="w-full h-9 bg-gray-200 rounded" />
          <div className="w-fit md:w-full h-9 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};
