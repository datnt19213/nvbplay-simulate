import {
  Select as SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {cn} from "@/lib/utils";

import React, {FC, HTMLAttributes, ReactNode} from "react";

type SelectProps = {
  actionButton: (data?: SelectItem) => ReactNode;
  className?: string;
  contentClass?: HTMLAttributes<HTMLDivElement>["className"];
  itemsClass?: HTMLAttributes<HTMLDivElement>["className"];
  items: SelectItem[];
  onSelected?: (select: SelectItem) => void;
  initialValue?: SelectItem;
};

type SelectItem = {id: string; name: string; value: string};

const Select: FC<SelectProps> = ({
  actionButton,
  items,
  className,
  contentClass,
  onSelected,
  initialValue,
}) => {
  const [selected, setSelected] = React.useState<SelectItem>(
    initialValue || items[0]
  );
  return (
    <SelectContainer
      value={selected.value}
      onValueChange={(value) => {
        const newItem = items.find((item) => item.value === value);
        if (newItem) {
          setSelected(newItem);
          onSelected && onSelected(newItem);
        }
      }}
    >
      <SelectTrigger className={cn("select-none", className)}>
        {actionButton && actionButton(selected)}
      </SelectTrigger>
      <SelectContent
        className={cn(
          "bg-white text-txtprimary border-gray-border",
          contentClass
        )}
      >
        {items?.length > 0 &&
          items.map((item) => (
            <SelectItem
              className={cn(
                "focus:bg-gray-primary cursor-pointer focus:text-txtprimary bg-white"
              )}
              value={item.value}
              key={item.id}
            >
              {item.name}
            </SelectItem>
          ))}
      </SelectContent>
    </SelectContainer>
  );
};

export default Select;
