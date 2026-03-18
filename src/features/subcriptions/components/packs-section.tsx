"use client";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormatCurrency } from "@/utilities/text";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DrawerChangePackage from "./drawer-change-package";
import SubcribleDialog from "./register-sub/subcrible-dialog";

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

type Props = {
  isMobile?: boolean;
};

const PacksSection = ({ isMobile = false }: Props) => {
  const [pack, setPack] = useState<string>("");
  return (
    <div
      className={cn(
        "flex flex-col gap-5 p-4 rounded-lg bg-white w-full",
        isMobile ? "desktop:hidden" : ""
      )}
    >
      <h2 className={cn("text-lg font-semibold", isMobile ? "hidden" : "")}>
        Lựa chọn gói hội viên
      </h2>
      <RadioGroup
        className={cn("w-full", {
          "desktop:hidden": isMobile,
        })}
        value={pack}
        onValueChange={setPack}
      >
        <div className="grid grid-cols-1 gap-2">
          {packs.map((item, index) => (
            <Label
              key={index}
              htmlFor={item.id}
              className="rounded-lg border [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600  p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative"
            >
              <RadioGroupItem
                value={item.id}
                id={item.id}
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
          <p
            className={cn(
              "text-sm text-muted-foreground text-center",
              isMobile ? "hidden" : ""
            )}
          >
            1 tháng dùng thử miễn phí, sau đó là <br />
            <b>650.000 đ/6 tháng</b> (cộng thuế phí).
          </p>
        </div>
      </RadioGroup>
      <div
        className={cn(
          "flex flex-col gap-2 py-2 px-4 desktop:p-4",
          isMobile
            ? "fixed block bottom-0 inset-x-0 z-50 bg-white desktop:hidden"
            : ""
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between",
            isMobile ? "desktop:hidden" : "hidden"
          )}
        >
          <div className="flex items-center gap-1">
            <span>12 tháng</span>

            <span>-</span>
            <span className="text-sm font-semibold">
              {FormatCurrency(650000)}
            </span>
          </div>
          <DrawerChangePackage />
        </div>
        <SubcribleDialog />
        <p className="text-xs desktop:text-sm text-muted-foreground text-center">
          Tự động gia hạn sau 12 tháng, hủy bất cứ lúc nào.
        </p>
      </div>
    </div>
  );
};

export default PacksSection;
