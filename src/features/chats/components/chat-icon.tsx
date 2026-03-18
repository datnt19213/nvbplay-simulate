import { cn } from "@/lib/utils";

interface ChatIconProps {
  src: string;
  alt: string;
  className?: string;
  type: "solid" | "gradient";
  size?: "sm" | "md" | "lg";
  color?:
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "purple"
    | "pink"
    | "orange"
    | "gray"
    | "black"
    | "white";
  from?: string;
  to?: string;
}
const ChatIcon = ({
  src,
  alt,
  className,
  type = "solid",
  size = "md",
  color = "red",
  from,
  to,
}: ChatIconProps) => {
  return (
    <>
      {type === "solid" && (
        <div
          className={cn(
            "size-full bg-primary flex items-center justify-center",
            size === "sm" && "size-8",
            size === "md" && "size-10",
            size === "lg" && "size-15",
            color === "red" && "bg-red-500",
            color === "blue" && "bg-blue-500",
            color === "green" && "bg-green-500",
            color === "yellow" && "bg-yellow-500",
            color === "purple" && "bg-purple-500",
            color === "pink" && "bg-pink-500",
            color === "orange" && "bg-orange-500",
            color === "gray" && "bg-gray-500",
            color === "black" && "bg-black",
            color === "white" && "bg-white",
            className
          )}
        >
          <img
            src={src}
            alt={alt}
            className={cn(
              size === "sm" && "size-6",
              size === "md" && "size-7",
              size === "lg" && "size-10"
            )}
          />
        </div>
      )}

      {type === "gradient" && (
        <div
          style={{
            background: `linear-gradient(to bottom, ${from}, ${to})`,
          }}
          className={cn(
            "flex items-center justify-center rounded-lg",
            size === "sm" && "size-8",
            size === "md" && "size-10",
            size === "lg" && "size-15",
            className
          )}
        >
          <img
            src={src}
            alt={alt}
            className={cn(
              size === "sm" && "size-6",
              size === "md" && "size-7",
              size === "lg" && "size-10"
            )}
          />
        </div>
      )}
    </>
  );
};

export default ChatIcon;
