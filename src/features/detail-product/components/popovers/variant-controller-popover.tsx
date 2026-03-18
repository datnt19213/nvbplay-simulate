import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import BuyControllerBox from "../buy-controller-box";

interface IProps {
  trigger: ReactNode;
  className?: string;
}

const VariantControllerPopover: React.FC<IProps> = ({ trigger, className }) => {
  return (
    <Popover>
      <PopoverTrigger className={cn(className)} asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <BuyControllerBox />
      </PopoverContent>
    </Popover>
  );
};

export default VariantControllerPopover;
