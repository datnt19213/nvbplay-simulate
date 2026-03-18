"use client";
import React, {
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  DropdownMenuCheckboxItemProps,
  DropdownMenuGroup,
} from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {STYLES} from "@/configs";

interface Option {
  id: any;
  label: string;
  value: any;
}

type SelectInputProps = {
  options: Option[];
  optionsDisable?: Option[];
  icon?: ReactNode;
  placeholder?: string;
  className?: string;
  contentClassName?: string;
  itemClassName?: string;
  onSelect?: (value: Option) => void;
  selectedValue?: any;
  buttonClass?: HTMLAttributes<HTMLButtonElement>["className"];
};

const SelectInput: FC<SelectInputProps> = ({
  options = [],
  optionsDisable = [],
  className,
  icon,
  selectedValue,
  placeholder,
  contentClassName,
  itemClassName,
  onSelect,
  buttonClass,
}) => {
  const [originalData, setOriginalData] = useState<Option[]>(options);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selected, setSelected] = React.useState<any>(selectedValue || "");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<string>("auto");

  useEffect(() => {
    if (searchValue == "") {
      setFilteredOptions(options);
      return;
    }
    if (options?.length > 0) {
      const temp = options;
      setFilteredOptions(
        temp.filter((item) =>
          item.label?.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredOptions([]);
    }
  }, [searchValue, options]);

  useEffect(() => {
    const updateWidth = () => {
      if (triggerRef.current) {
        setDropdownWidth(`${triggerRef.current.offsetWidth}px`);
      }
    };

    updateWidth();

    // Optional: Listen for window resize to adjust dynamically
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <DropdownMenu onOpenChange={(open) => open && setSearchValue("")}>
      <DropdownMenuTrigger
        onClick={() => setFilteredOptions(options)}
        asChild
        className={cn("w-full", className)}
      >
        <Button
          ref={triggerRef}
          variant="outline"
          className={cn(
            "w-full justify-between bg-gray-primary font-normal",
            STYLES.disableFocusVisible,
            buttonClass
          )}
        >
          {selected !== "" ? (
            selected
          ) : (
            <p className="text-gray-icon/80">{placeholder}</p>
          )}
          {icon ? icon : <ChevronDown className="opacity-50" size={20} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          width: dropdownWidth,
          maxWidth: dropdownWidth,
        }}
        className={cn("w-full ", contentClassName)}
      >
        <DropdownMenuLabel className="w-full p-0">
          <Input
            className="focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:!outline-none border-none"
            placeholder="Type search..."
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            onKeyUp={(e) => {
              e.stopPropagation();
            }}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-52 scrollbar-thin overflow-y-scroll overflow-x-hidden">
          {Array.isArray(filteredOptions) &&
            filteredOptions.map((item, index) => (
              <DropdownMenuCheckboxItem
                className={cn("cursor-pointer", itemClassName)}
                key={index}
                checked={selected === item.value}
                onFocusCapture={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onCheckedChange={() => {
                  setSelected(item.value);
                  onSelect && onSelect(item);
                }}
                disabled={optionsDisable.some(
                  (opt) => opt.value === item.value
                )}
              >
                {item.label}
              </DropdownMenuCheckboxItem>
            ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectInput;
