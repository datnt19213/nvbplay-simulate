import {Icon} from "@/components/common-components";
import {cn} from "@/lib/utils";
import {Eye, EyeOff} from "lucide-react";
import * as React from "react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const IconInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({className, type, icon, showPasswordToggle = false, ...props}, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        {icon && (
          <div className="absolute border-r pr-2 left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          type={showPassword ? "text" : type}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "md:text-sm",
            icon && "pl-12",
            showPasswordToggle && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <Icon icon="ph:eye-closed" fontSize={24} />
            ) : (
              <Icon icon="ph:eye" fontSize={24} />
            )}
          </button>
        )}
      </div>
    );
  }
);

IconInput.displayName = "IconInput";

export {IconInput};
