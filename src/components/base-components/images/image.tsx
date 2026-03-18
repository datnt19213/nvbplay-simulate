"use client";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/assets/images";
import { NvbPlay } from "@/assets/icons";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
  className?: string; // Class dành cho thẻ div
  classNameImage?: string; // Class dành cho thẻ div
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  fallback,
  className,
  classNameImage,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset trạng thái khi src thay đổi, nhưng kiểm tra xem src có hợp lệ không
    setHasError(!src || src === "");
  }, [src]);

  const handleError = () => {
    setHasError(true); // Đánh dấu trạng thái lỗi khi load ảnh
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {hasError ? (
        // Hiển thị fallback khi xảy ra lỗi hoặc src rỗng
        <div className="flex h-full w-full items-center justify-center">
          {fallback || (
            <div className="flex h-full w-full flex-1 items-center justify-center border-4 border-white dark:border-neutral-800 bg-[#F5F5F5] dark:bg-neutral-700">
              {/* <svg
                className="max-h-32 h-full max-w-32 w-full text-white dark:text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                >
                  <path d="M15 8h.01M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9" />
                  <path d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l5 5" />
                  <path d="m14 14l1-1c.928-.893 2.072-.893 3 0l2.5 2.5" />
                </g>
              </svg> */}
              <img
                src={NvbPlay.src}
                alt="fallback"
                className="max-h-32 h-full max-w-32 w-full"
              />
            </div>
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          {...rest}
          onError={handleError}
          className={cn("h-full w-full object-cover", classNameImage)}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default Image;
