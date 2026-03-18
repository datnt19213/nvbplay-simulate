import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { InputProps } from "@/types";
import { Icon } from "@iconify/react";
import React, { forwardRef } from "react";

type SearchInputProps = InputProps & {
  containerClassName?: string;
  iconRight?: boolean;
  onChange?: (value: any) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

// Forwarding ref to SearchInput
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { containerClassName, iconRight = false, onChange, onSubmit, ...rest },
    ref
  ) => {
    return (
      <form
        onSubmit={onSubmit}
        className={cn(
          "bg-[#F5F5FA] h-10 flex items-center gap-2 rounded-full overflow-hidden px-4",
          containerClassName
        )}
      >
        <Button type="submit" variant="ghost" size="icon" className="p-0 hover:bg-transparent">
          <Icon
            icon="ph:magnifying-glass"
            className={cn("size-5 text-gray-400", iconRight && "order-2")}
          />
        </Button>
        <Input
          {...rest}
          ref={ref} // Forwarding ref to Input
          onChange={(e) => onChange && onChange(e)}
          className="bg-transparent pl-0 h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        />
      </form>
    );
  }
);

SearchInput.displayName = "SearchInput"; // It's a good practice to name the component when using forwardRef

export default SearchInput;
