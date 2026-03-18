import {AddressTagItem} from "@/features/profile/components/address-list";
import {cn} from "@/lib/utils";
import {Check} from "lucide-react";
import React, {FC, HTMLAttributes, ReactNode} from "react";

type RadioCardProps = {
  id: string;
  name: string;
  isChecked: boolean;
  className?: string;
  handleEdit?: () => void;
  children?: ReactNode;
  showRadioButton?: boolean;
} & HTMLAttributes<HTMLInputElement>;

export const RadioCard: FC<RadioCardProps> = ({
  id,
  isChecked,
  name,
  children,
  className,
  handleEdit,
  showRadioButton = true,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        "border p-4 max-h-[160px] w-full relative rounded-lg overflow-hidden flex gap-4",
        isChecked ? "border-blue-hovered" : "border-gray-300",
        className
      )}
    >
      {isChecked && (
        <div className="h-[13px] w-[13px] flex items-center justify-center rounded-bl-[8px] bg-blue-hovered top-0 right-0 absolute z-[2]">
          <Check size={8} className="text-white" />
        </div>
      )}
      <input
        type="radio"
        name={name}
        id={id}
        hidden={showRadioButton}
        className={cn("w-6 h-6 checked:accent-blue-hovered")}
        checked={isChecked}
        onChange={() => handleEdit && handleEdit()}
        {...props}
      />
      {children}
    </label>
  );
};

export default RadioCard;

type RadioCheckProps = {
  id: string;
  name: string;
  isChecked: boolean;
  className?: string;
  itemClass?: string;
  handleEdit?: () => void;
  children?: ReactNode;
} & HTMLAttributes<HTMLInputElement>;

export const RadioCheck: FC<RadioCheckProps> = ({
  id,
  isChecked,
  name,
  children,
  className,
  itemClass,
  handleEdit,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        "max-h-[160px] w-full relative rounded-lg overflow-hidden flex gap-3 items-center cursor-pointer",
        isChecked ? "border-blue-hovered" : "border-gray-300",
        className
      )}
    >
      <input
        type="radio"
        name={name}
        id={id}
        className={cn(
          "w-5 h-5 checked:accent-blue-hovered cursor-pointer",
          itemClass
        )}
        checked={isChecked}
        onChange={() => handleEdit && handleEdit()}
        {...props}
      />
      {children}
    </label>
  );
};
