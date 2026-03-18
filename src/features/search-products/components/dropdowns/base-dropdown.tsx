"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
}

export interface IFilterAction {
  handleApply?: Function;
}

const BaseDropdown: React.FC<IProps> = ({ title, children, triggerClassName }) => {
  return (
    <AccordionItem
      autoFocus={false}
      value={title}
      className="space-y-[8px] focus:outline-none"
    >
      <AccordionTrigger
        autoFocus={false}
        className={cn("hover:!no-underline text-14-21-600", triggerClassName)}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export default BaseDropdown;
