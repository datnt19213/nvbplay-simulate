import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import BuyOptionsBox from "../options/buy-options-box";

interface IProps {
  trigger: ReactNode;
  className?: string;
}

const OptionsSheet: React.FC<IProps> = ({ trigger, className }) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(className)} asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side={"bottom"} className="w-full p-0 rounded-t-[8px]">
        <SheetHeader className="py-[8px]">
          <SheetTitle className=" text-[16px] leading-[24px] font-[600]">
            Lựa chọn
          </SheetTitle>
        </SheetHeader>
        <BuyOptionsBox showPrice />
      </SheetContent>
    </Sheet>
  );
};

export default OptionsSheet;
