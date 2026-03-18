"use client";

import { ButtonCheck } from "@/components/base-components/buttons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps {
  showTutorial?: boolean;
  size?: "normal" | "small";
  sizeItems: string[];
  handleSetSize: (size: string) => void;
}

const SizeContainer: React.FC<IProps> = ({
  showTutorial = true,
  size = "normal",
  sizeItems,
  handleSetSize,
}) => {
  const [selectedSize, setSelectedSize] = useState(sizeItems[0]);

  const handleOnClick = (size: string) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    handleSetSize(selectedSize);
  }, [selectedSize]);

  const checkBoxClassName = {
    normal: "w-[72px]",
    small: "w-[52px] h-[28px] flex justify-center items-center",
  };

  return (
    <div className="space-y-[12px]">
      <div className="justify-between flex gap-[8px]">
        <div className="text-sm font-[500] flex flex-wrap gap-[2px]">
          <span className="text-[#515158]">Kích thước: </span>
          <span>S (146 - 152cm, 39 - 61kg)</span>
        </div>
        {showTutorial && (
          <Link
            href="#"
            className="text-txtthird font-[600] text-sm whitespace-nowrap"
          >
            Hướng dẫn chọn size
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizeItems?.map((i, index) => (
          <ButtonCheck
            className={cn(checkBoxClassName[size])}
            title={i}
            name={"size"}
            id={i}
            key={index}
            onChange={() => {}}
            isChecked={selectedSize === i}
            onClick={() => handleOnClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default SizeContainer;
