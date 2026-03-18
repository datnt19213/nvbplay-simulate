import { cn } from "@/lib/utils";

interface SkeletonsProps {
  className?: string;
  direction?: "row" | "column";
  count?: number;
  gap?: number;
  children?: React.ReactNode;
}
const Skeletons = ({
  className,
  direction = "row",
  count = 1,
  gap = 0,
  children,
}: SkeletonsProps) => {
  return (
    <div
      className={cn(
        "flex w-full",
        direction === "row" ? "flex-row" : "flex-col",
        gap ? `gap-${gap}` : ""
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-full h-full relative space-y-5 border overflow-hidden rounded-2xl border-gray-100 bg-gray-200 p-4 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-100/70 dark:before:via-gray-100/10 before:to-transparent",
            className
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Skeletons;
