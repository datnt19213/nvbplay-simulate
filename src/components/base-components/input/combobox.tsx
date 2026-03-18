"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverPortal,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

type ComboboxProps = {
  items: {
    label: string;
    value: string;
  }[];
  label?: string;
  required?: boolean;
  sizes?: "small" | "medium";
  placeholder?: string;
  onSelect?: (value: string) => void;
  className?: string;
  contentClassName?: string;
};

export function Combobox({
  items,
  label,
  sizes = "small",
  required,
  placeholder = "Chọn",
  onSelect,
  className,
  contentClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <div className="flex flex-col">
          {label && (
            <span className="flex justify-between items-center text-neutral-800 mb-2">
              <Label
                className={cn("text-neutral-900 dark:text-neutral-300", {
                  "text-sm font-medium": sizes === "small",
                  "text-base": sizes === "medium",
                })}
              >
                {label} {required && <span className="text-red-500">*</span>}
              </Label>
            </span>
          )}
          <Button
            type="button"
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full border-none truncate bg-[#F5F5FA] dark:bg-neutral-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 rounded text-sm font-normal min-h-11 h-10 px-4 py-3 flex justify-between items-center",
              className
            )}
          >
            <span
              className={cn({
                "text-muted-foreground": value === "",
              })}
            >
              {value
                ? items.find((item) => item.value === value)?.label
                : placeholder}
            </span>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          align="end"
          className="p-0"
          style={{
            width: "var(--radix-popover-trigger-width)",
            pointerEvents: "auto",
          }}
        >
          <Command
            filter={(value, search) => {
              const sanitizedSearch = search
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

              const searchRegex = new RegExp(sanitizedSearch, "i");

              const platformLabel =
                items
                  .find((item) => item.value === value)
                  ?.label.normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "") || "";

              return searchRegex.test(platformLabel) ? 1 : 0;
            }}
          >
            <CommandInput placeholder="Tìm kiếm..." />
            <CommandList>
              <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue ?? "");
                      setOpen(false);
                      onSelect && onSelect(currentValue);
                    }}
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
