import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import React, {FC, ReactNode} from "react";

interface TextInputProps {
  type?: "text" | "password" | "email" | "number" | "search";
  value?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  leftIconContainerClassName?: string;
  rightIconContainerClassName?: string;
  lineLeft?: boolean;
  lineRight?: boolean;
  onSubmitByEnter?: () => void;
}

const TextInput: FC<TextInputProps> = ({
  type = "text",
  value,
  placeholder,
  leftIcon,
  rightIcon,
  onChange,
  className,
  inputClassName,
  disabled = false,
  leftIconContainerClassName = "border-r",
  rightIconContainerClassName = "",
  onSubmitByEnter,
}) => {
  return (
    <div
      className={cn(
        "relative flex h-12 items-center border rounded-lg w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {leftIcon && (
        <div
          className={cn(
            "size-12 aspect-square min-w-12 min-h-12 flex items-center justify-center",
            leftIconContainerClassName
          )}
        >
          {leftIcon}
        </div>
      )}
      <div className="w-full px-1">
        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={cn(
            "px-2 py-2 outline-none ring-offset-0 bg-transparent focus-visible:!bg-transparent focus-visible:!ring-offset-0 w-full focus-visible:!outline-none hover:!outline-none focus-visible:!border-none hover:!border-none focus-visible:!ring-0 hover:!ring-0 border-none rounded-none",
            inputClassName
          )}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmitByEnter && onSubmitByEnter();
            }
          }}
        />
      </div>
      {rightIcon && type === "password" && (
        <div
          className={cn(
            "size-12 aspect-square cursor-pointer min-w-12 min-h-12 flex items-center justify-center",
            rightIconContainerClassName
          )}
        >
          {rightIcon}
        </div>
      )}
      {rightIcon && type !== "password" && (
        <div
          className={cn(
            "size-12 aspect-square min-w-12 min-h-12  flex items-center justify-center",
            rightIconContainerClassName
          )}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default TextInput;
