import { ButtonCheck } from "@/components/base-components/buttons";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface IProps {
  colors: string[];
  handleSetColor: (color: string) => void;
}

const ColorContainer2: React.FC<IProps> = ({ colors, handleSetColor }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const onClick = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    handleSetColor(selectedColor);
  }, [selectedColor]);

  const checkBoxClassName = {
    normal: "min-w-[72px]",
    small: "min-w-[52px] h-[28px] flex justify-center items-center",
  };

  return (
    <div className="space-y-[12px]">
      <div className="justify-between flex gap-[8px]">
        <div className="text-sm font-[500] flex flex-wrap gap-[2px]">
          <span className="text-[#515158]">Màu sắc: </span>
          <span>{colors.map((color) => color).join(", ") || "Trắng đen"} </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {colors?.map((i, index) => (
          <ButtonCheck
            className={cn(checkBoxClassName.normal)}
            title={i}
            name={"color"}
            id={i}
            key={index}
            onChange={() => {}}
            isChecked={selectedColor === i}
            onClick={() => onClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorContainer2;
