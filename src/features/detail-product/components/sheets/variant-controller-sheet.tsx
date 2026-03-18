import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import BuyControllerBox from "../buy-controller-box";

interface IProps {
  trigger: ReactNode;
  className?: string;
  type?: "main-cta3" | "attach" | "main-cta4";
}

const VariantControllerSheet: React.FC<IProps> = ({
  trigger,
  className,
  type = "main-cta3",
}) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(className)} asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side={"bottom"} className="w-full p-0 rounded-t-[8px]">
        <SheetHeader className="py-[8px]">
          <SheetTitle className=" text-[16px] leading-[24px] font-[600]">
            {type !== "attach"
              ? "Chọn số lượng và thuộc tính"
              : "  Chọn thuộc tính mua kèm"}
          </SheetTitle>
        </SheetHeader>
        <BuyControllerBox type={type} showProduct />
      </SheetContent>
    </Sheet>
  );
};

export default VariantControllerSheet;
