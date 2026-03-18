import {Button, ButtonProps} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, Loader2} from "lucide-react";
import {
  FC,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
} from "react";

type ButtonCategoryListItemProps = {
  children: ReactNode | string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

export const ButtonCategoryListItem: FC<ButtonCategoryListItemProps> = ({
  children,
  active,
  className,
  onClick,
}) => {
  return (
    <Button
      type="button"
      variant="default"
      onClick={onClick && onClick}
      className={cn(
        "rounded-full bg-gray-primary hover:bg-gray-primary text-gray-icon text-sm font-medium !h-10 flex items-center justify-center !w-fit px-4 py-1",
        className,
        active &&
          "bg-txtthird hover:bg-txtthird text-white transition-all duration-300"
      )}
    >
      {children}
    </Button>
  );
};

type ButtonSubmitPrimaryProps = {
  children: ReactNode | string;
  className?: string;
  onClickHandle?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
} & ButtonProps &
  HTMLAttributes<HTMLButtonElement>;

export const ButtonSubmitPrimary: FC<ButtonSubmitPrimaryProps> = ({
  children,
  className,
  disabled,
  isLoading,
  onClickHandle,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled}
      variant={"default"}
      onClick={(e) => {
        if (onClickHandle) {
          onClickHandle();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClickHandle && onClickHandle();
        }
      }}
      className={cn(
        "bg-txtthird w-full rounded-md py-2 px-4 text-white text-sm font-semibold gap-2 hover:opacity-80 transition-all duration-300",
        className,
        isLoading && "pointer-events-none select-none"
      )}
    >
      {isLoading && <Loader2 className="animate-spin" size={20} />}
      {children}
    </Button>
  );
};

type ButtonCheckProps = {
  title: string;
  isChecked?: boolean;
  name: string;
  id: string;
  className?: string;
  disabled?: boolean;
} & HTMLAttributes<HTMLInputElement>;

export const ButtonCheck: FC<ButtonCheckProps> = ({
  title,
  isChecked,
  id,
  name,
  className,
  disabled,
  ...props
}) => {
  return (
    <label
      htmlFor={"rd" + id}
      className={cn(
        "border relative transition-all duration-300 rounded-lg px-3 py-1.5 bg-white select-none cursor-pointer overflow-hidden ",
        isChecked ? "border-blue-hovered" : "border-gray-300",
        className ? `${className} text-center` : ""
      )}
    >
      <span className="text-gray-900 font-semibold text-sm relative z-[1]">
        {title}
      </span>
      {isChecked && (
        <div className="h-[13px] w-[13px] flex items-center justify-center rounded-bl-lg bg-blue-hovered top-0 right-0 absolute z-[2]">
          <Check size={8} className="text-white" />
        </div>
      )}
      <input
        className="hidden"
        id={"rd" + id}
        checked={isChecked}
        type="checkbox"
        name={name}
        readOnly
        onChange={props.onChange}
        disabled={disabled}
        {...props}
      />
    </label>
  );
};
type ButtonLabelProps = {
  id: string;
  className?: string;
  type: HTMLInputTypeAttribute;
  disabled?: boolean;
  children: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const ButtonLabel: FC<ButtonLabelProps> = ({
  title,
  id,
  className,
  type,
  disabled,
  children,
  ...props
}) => {
  return (
    <label
      htmlFor={"lb" + id}
      className={cn(
        "bg-txtthird w-full rounded-md py-2 px-4 text-white text-sm font-semibold gap-2 hover:opacity-80 transition-all duration-300 flex justify-center items-center select-none cursor-pointer",
        className ? `${className} text-center` : ""
      )}
    >
      {children}
      <input
        className="hidden"
        id={"lb" + id}
        type={type}
        readOnly
        onChange={props.onChange}
        disabled={disabled}
        {...props}
      />
    </label>
  );
};
