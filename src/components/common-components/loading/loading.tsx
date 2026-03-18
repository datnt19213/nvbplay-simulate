import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

const LoadingOverlay: React.FC<IProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] h-screen w-full flex items-center justify-center",
        className
      )}
    >
      <div className="absolute z-0 inset-0 bg-black size-full" />
      <div className="z-10 flex flex-col items-center justify-center">
        <img src="/icons/nvbplay_logo.svg" alt="loading" className="size-32" />
        <p className="animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%] text-lg font-bold -mt-5">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
