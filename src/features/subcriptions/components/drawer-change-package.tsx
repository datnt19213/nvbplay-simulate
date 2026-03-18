import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FormatCurrency } from "@/utilities/text";
const packs = [
  {
    id: "1",
    name: "2 tháng",
    description: "1 tháng dùng thử",
    price: 200000,
  },
  {
    id: "2",
    name: "12 tháng",
    description: "1 tháng dùng thử",
    price: 1014000,
    priceSale: 650000,
    salePercent: 45,
  },
  {
    id: "3",
    name: "24 tháng",
    description: "1 tháng dùng thử",
    price: 1600000,
    priceSale: 1200000,
    salePercent: 24,
  },
];
const DrawerChangePackage = () => {
  const [pack, setPack] = useState<string>("");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="text-blue-600 hover:text-blue-700">
          Thay đổi
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="py-2 min-h-[50vh] !rounded-lg">
        <SheetHeader>
          <SheetTitle className="text-left">Thay đổi gói cước</SheetTitle>
        </SheetHeader>
        <RadioGroup
          className={cn("w-full py-4 overflow-y-auto")}
          value={pack}
          onValueChange={setPack}
        >
          <div className="grid grid-cols-1 gap-2">
            {packs.map((item, index) => (
              <Label
                key={index}
                htmlFor={`pack-${item.id}`}
                className="rounded-lg border [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600  p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative"
              >
                <RadioGroupItem
                  value={item.id}
                  id={`pack-${item.id}`}
                  className="text-blue-600 border-blue-600 peer"
                />
                <div className="flex items-center flex-1 justify-between">
                  <div className="flex items-center gap-3 ">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-semibold">
                      {FormatCurrency(item.price)}
                    </p>
                    <div className="flex items-center gap-2">
                      {item.priceSale && (
                        <span className="text-sm line-through text-muted-foreground">
                          {FormatCurrency(item.priceSale)}
                        </span>
                      )}
                      {item.salePercent && (
                        <Badge className="text-xs bg-[#FFDBC2] text-[#FF7400] hover:bg-[#FFDBC2] hover:text-[#FF7400]">
                          {item.salePercent}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Label>
            ))}
          </div>
        </RadioGroup>
        <div className={cn("flex flex-col gap-2 py-2 px-4 desktop:p-4")}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Đăng ký ngay
          </Button>
          <p className="text-xs desktop:text-sm text-muted-foreground text-center">
            Tự động gia hạn sau 12 tháng, hủy bất cứ lúc nào.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerChangePackage;
