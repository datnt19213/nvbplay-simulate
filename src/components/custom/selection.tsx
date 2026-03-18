import React, {ReactNode} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {cn} from "@/lib/utils";

type SelectionProps = {
  items: ItemObjProps[];
  onSelected: (item: ItemObjProps) => void;
  selectedItem?: ItemObjProps;
  defaultValue?: ItemObjProps;
  triggerClass?: string;
  selectValueClass?: string;
  wrapperItemsClass?: string;
  itemsClass?: string;
  show?: "value" | "element";
  selectComponent?: ReactNode;
};

type ItemObjProps = {
  id: number | string;
  name: string;
  value: any;
  icon?: ReactNode;
};

const Selection: React.FC<SelectionProps> = ({
  items,
  onSelected,
  selectedItem,
  defaultValue,
  triggerClass,
  selectValueClass,
  wrapperItemsClass,
  itemsClass,
  show = "value",
  selectComponent,
}) => {
  // if (!Array.isArray(items) || items.length === 0) {
  //   console.error("The 'items' prop must be a non-empty array.");
  //   return null;
  // }

  if (
    selectedItem &&
    !items.some((item) => item.value === selectedItem.value)
  ) {
    console.warn("The 'selectedItem' is not included in the 'items' list.");
  }

  if (
    defaultValue &&
    !items.some((item) => item.value === defaultValue.value)
  ) {
    console.warn("The 'defaultValue' is not included in the 'items' list.");
  }

  return (
    <Select
      onValueChange={(value: any) => {
        const selected = items.find((item) => item.value === value);
        if (selected) {
          onSelected(selected);
        }
      }}
      value={selectedItem?.value || defaultValue?.value || ""}
    >
      <SelectTrigger
        className={cn(
          "w-full outline-none ring-0 !ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 select-none max-w-[200px]",
          triggerClass
        )}
      >
        {show === "value" && (
          <SelectValue
            className={cn(selectValueClass)}
            placeholder="Select an item"
          />
        )}
        {show === "element" && selectComponent}
      </SelectTrigger>
      <SelectContent className={cn(wrapperItemsClass)}>
        {items.map((item) => (
          <SelectItem
            className={cn("flex items-center gap-2", itemsClass)}
            key={item.id}
            value={item.value}
          >
            {item?.icon && item.icon}
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Selection;
