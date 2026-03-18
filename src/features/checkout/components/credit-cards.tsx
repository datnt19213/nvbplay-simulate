import { CreditCardPlus, JCB, MasterCard, Visa } from "@/assets/icons";
import AddNewItem from "@/components/base-components/cta/add-new-item";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import React, { useState } from "react";
import CreditCardForm from "./credit-card-form";

const creditCards = [
  {
    id: "visa",
    name: "Visa",
    number: "*1104",
    icon: Visa,
  },
  {
    id: "jcb",
    name: "JCB",
    number: "*1104",
    icon: JCB,
  },
  {
    id: "master-card",
    name: "Master Card",
    number: "*1104",
    icon: MasterCard,
  },
];

const CreditCards = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [creditCard, setCreditCard] = useState("visa");
  const [isAddNewCard, setIsAddNewCard] = useState(false);
  return (
    <DialogResponsive
      open={open}
      setOpen={setOpen}
      dialogClassname={cn(isAddNewCard ? "h-[468px]" : "h-[480px]")}
      trigger={
        children ? (
          children
        ) : (
          <AddNewItem className="h-[160px]">Chọn cửa hàng</AddNewItem>
        )
      }
    >
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto p-4 mb-auto">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-center">
            Chọn thẻ tín dụng/ghi nợ
          </DialogTitle>
        </DialogHeader>

        <div
          className="p-3 rounded-lg border border-dashed flex items-center gap-3 cursor-pointer hover:bg-gray-100"
          onClick={() => setIsAddNewCard(true)}
        >
          <img src={CreditCardPlus.src} className="size-10" alt="" />
          <span className="text-sm font-semibold">Thêm thẻ mới</span>
        </div>
        <div
          className={cn(
            "absolute inset-0 w-full h-full z-50 overflow-y-auto transition-transform duration-300 ease-in-out -translate-x-full bg-white dark:bg-gray-800",
            isAddNewCard ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col flex-1 h-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-b-gray-100">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAddNewCard(false)}
              >
                <IconCustom icon="tabler:chevron-left" className="size-4" />
              </Button>
              <h2 className="text-lg font-semibold">
                Thêm thẻ tín dụng/ghi nợ
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <IconCustom icon="tabler:x" className="size-4" />
              </Button>
            </div>
            <div className="p-4 pb-0 flex flex-1 flex-col gap-5  overflow-y-auto scrollbar-none">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Thông tin thẻ</h2>
                <div className="flex items-center gap-3 mix-blend-plus-darker">
                  <img
                    src={Visa.src}
                    className="h-3 filter grayscale hover:filter-none transition-all duration-300 ease-in-out"
                    alt="Visa"
                  />
                  <img
                    src={JCB.src}
                    className="h-3 filter grayscale hover:filter-none transition-all duration-300 ease-in-out   "
                    alt="JCB"
                  />
                  <img
                    src={MasterCard.src}
                    className="h-3 filter grayscale hover:filter-none transition-all duration-300 ease-in-out"
                    alt="Master Card"
                  />
                </div>
              </div>
              <div className="flex flex-col h-full flex-1">
                <CreditCardForm />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-b-gray-100" />
        <RadioGroup
          className="w-full"
          value={creditCard}
          onValueChange={setCreditCard}
        >
          <div className="grid grid-cols-1 gap-2">
            {creditCards.map((item, index) => (
              <Label
                key={index}
                htmlFor={item.id}
                className="rounded-lg border [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600  p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative"
              >
                {creditCard === item.id && (
                  <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
                    <IconCustom icon="ph:check" className="size-2.5" />
                  </div>
                )}
                <RadioGroupItem
                  value={item.id}
                  id={item.id}
                  className="text-blue-600 border-blue-600 peer"
                />
                <div className="flex items-start flex-1 justify-between">
                  <div className="flex items-center gap-3 ">
                    <img
                      src={item.icon.src}
                      alt={item.name}
                      className="size-10"
                      loading="lazy"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.number}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-sm">
                    <IconCustom icon="tabler:dots" className="size-4" />
                  </Button>
                </div>
              </Label>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="h-[64px] flex items-center justify-center border-t border-t-gray-200">
        <div className="px-4 w-full">
          <Button className="w-full">Xác nhận</Button>
        </div>
      </div>
    </DialogResponsive>
  );
};

export default CreditCards;
