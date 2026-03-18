import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

type ButtonCheckProps = {
  title: string;
  isChecked?: boolean;
  className?: string;
  image?: string;
  imageClassName?: string;
  onClick?: () => void;
};

export const TagCheckbox: FC<ButtonCheckProps> = ({
  title,
  isChecked = false,
  className,
  image,
  imageClassName,
  onClick,
}) => {
  return (
    <div
      onClick={onClick} // Gọi sự kiện khi click
      className={cn(
        "border relative flex justify-center items-center transition-all duration-300 rounded-lg px-3 py-1.5 bg-white select-none cursor-pointer overflow-hidden",
        isChecked ? "border-blue-hovered bg-blue-light" : "border-gray-300",
        className
      )}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          width={40}
          height={40}
          className={cn("rounded-lg", imageClassName)}
        />
      )}

      {/* Text */}
      <span className="text-gray-900 font-semibold text-sm relative z-[1]">
        {title}
      </span>

      {/* Icon hiển thị khi đã check */}
      {isChecked && (
        <div className="h-[13px] w-[13px] flex items-center justify-center rounded-bl-lg bg-blue-hovered top-0 right-0 absolute z-[2]">
          <Check size={8} className="text-white" />
        </div>
      )}
    </div>
  );
};
