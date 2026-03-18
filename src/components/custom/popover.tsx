import {ReactNode} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {cn} from "@/lib/utils";

interface RePopoverProps {
  triggerContent: ReactNode;
  children?: ReactNode;
  popoverProps?: React.ComponentProps<typeof Popover>;
  triggerProps?: React.ComponentProps<typeof PopoverTrigger>;
  contentProps?: React.ComponentProps<typeof PopoverContent>;
  triggerClass?: string;
  contentClass?: string;
}

const RePopover: React.FC<RePopoverProps> = ({
  triggerContent,
  children,
  popoverProps,
  triggerProps,
  contentProps,
  triggerClass,
  contentClass,
}) => {
  return (
    <Popover {...popoverProps}>
      <PopoverTrigger {...triggerProps} className={triggerClass}>
        {triggerContent}
      </PopoverTrigger>
      {children && (
        <PopoverContent
          {...contentProps}
          className={cn(
            "min-w-full max-w-[200px] border-gray-border rounded-lg !px-4 !py-2",
            contentClass
          )}
        >
          {children}
        </PopoverContent>
      )}
    </Popover>
  );
};

export default RePopover;
