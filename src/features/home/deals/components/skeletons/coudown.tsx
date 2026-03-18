import Skeletons from "@/components/custom/skeletons";

export const CountdownSkeleton = () => {
  return (
    <div className="p-4">
      <div className="mx-auto flex gap-1 desktop:gap-2 w-full max-w-5xl items-center bg-white">
        {/* Day */}
        <CountdownItemSkeleton />
        <span>:</span>
        {/* Hour */}
        <CountdownItemSkeleton />
        <span>:</span>
        {/* Minute */}
        <CountdownItemSkeleton />
        <span>:</span>
        {/* Second */}
        <CountdownItemSkeleton />
      </div>
    </div>
  );
};

const CountdownItemSkeleton = ({ withUnit = false }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
      <Skeletons className="size-8 rounded-lg overflow-hidden">
        <div className="w-full h-full" />
      </Skeletons>
      {withUnit && (
        <Skeletons className="w-12 h-4 rounded-md">
          <div className="w-full h-full" />
        </Skeletons>
      )}
    </div>
  );
};
