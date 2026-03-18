"use client";

import { ButtonCheck } from "@/components/base-components/buttons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps {
  size?: "normal" | "small";
  weightItems: string[];
  handleSetWeight: (weight: string) => void;
}

const SizeContainer: React.FC<IProps> = ({
  size = "normal",
  weightItems,
  handleSetWeight,
}) => {
  const [selectedWeight, setSelectedWeight] = useState(weightItems[0]);

  const handleOnClick = (weight: string) => {
    setSelectedWeight(weight);
  };

  useEffect(() => {
    handleSetWeight(selectedWeight);
  }, [selectedWeight]);

  const checkBoxClassName = {
    normal: "w-fit",
    small: "w-[52px] h-[28px] flex justify-center items-center",
  };

  return (
    <div className="space-y-[12px]">
      <div className="justify-between flex gap-[8px]">
        <div className="text-sm font-[500] flex flex-wrap gap-[2px]">
          <span className="text-[#515158]">Trọng lượng: </span>
          <span>{weightItems.map((weight) => weight).join(", ") || ""} </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {weightItems?.map((i, index) => (
          <ButtonCheck
            className={cn(checkBoxClassName[size])}
            title={i}
            name={"size"}
            id={i}
            key={index}
            onChange={() => {}}
            isChecked={selectedWeight === i}
            onClick={() => handleOnClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default SizeContainer;
