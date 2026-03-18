import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import BuyOptionsBox from "../options/buy-options-box";

interface IProps {
  trigger: ReactNode;
  className?: string;
}

const OptionsPopover: React.FC<IProps> = ({ trigger, className }) => {
  return (
    <Popover>
      <PopoverTrigger className={cn(className)} asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <BuyOptionsBox />
      </PopoverContent>
    </Popover>
  );
};

export default OptionsPopover;
