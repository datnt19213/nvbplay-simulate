import {
  Bitcoin,
  coin,
  Copy,
  Mbbank,
  Pvcombank,
  Techcombank,
} from "@/assets/icons";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import React, { useState } from "react";
import { FormatCurrency } from "@/utilities/text";
import { Input } from "@/components/ui/input";
import { Check, Search } from "lucide-react";
import {
  Accordion,
  Content,
  Tab,
  Trigger,
} from "@/components/custom/accordion";

const installments = [
  {
    id: "mb",
    name: "MBBank",
    description: "Ngân hàng Thương mại Cổ phần Quân đội",
    code: "MB",
    icon: Mbbank,
    terms: [
      {
        id: "mb1",
        name: "3 tháng",
        priceOfMonth: 1933842,
        priceOfInstallment: 5801526,
        difference: 111524,
        interestRate: 11,
      },
      {
        id: "mb2",
        name: "6 tháng",
        priceOfMonth: 1066921,
        priceOfInstallment: 6401526,
        difference: 111524,
        interestRate: 11,
      },
      {
        id: "mb3",
        name: "12 tháng",
        priceOfMonth: 5801526,
        priceOfInstallment: 6401526,
        difference: 111524,
        interestRate: 11,
      },
    ],
  },
  {
    id: "pv",
    name: "PVBank",
    description: "Ngân hàng Thương mại Cổ phần Phương Việt",
    code: "PV",
    icon: Pvcombank,
    terms: [
      {
        id: "pv1",
        name: "3 tháng",
        priceOfMonth: 1933842,
        priceOfInstallment: 5801526,
        difference: 111524,
        interestRate: 11,
      },
      {
        id: "pv2",
        name: "6 tháng",
        priceOfMonth: 1066921,
        priceOfInstallment: 6401526,
        difference: 111524,
        interestRate: 11,
      },
      {
        id: "pv3",
        name: "12 tháng",
        priceOfMonth: 5801526,
        priceOfInstallment: 6401526,
        difference: 111524,
        interestRate: 11,
      },
    ],
  },
  {
    id: "tech",
    name: "Techcombank",
    description: "Ngân hàng Thương mại Cổ phần Kỹ thương Việt Nam",
    code: "TCB",
    icon: Techcombank,
    terms: [
      {
        id: "tech1",
        name: "3 tháng",
        priceOfMonth: 1933842,
        priceOfInstallment: 5801526,
        difference: 111524,
        interestRate: 11,
      },
      {
        id: "tech2",
        name: "6 tháng",
        priceOfMonth: 1066921,
        priceOfInstallment: 6401526,
        difference: 111524,
        interestRate: 11,
      },
      {
        id: "tech3",
        name: "12 tháng",
        priceOfMonth: 5801526,
        priceOfInstallment: 6401526,
        difference: 111524,
        interestRate: 11,
      },
    ],
  },
];

const Installment = () => {
  const [open, setOpen] = useState(false);
  const [bank, setBank] = useState("");
  const [openTerms, setOpenTerms] = useState(false);

  const handleSelectBank = (bank: string) => {
    setBank(bank);
  };

  return (
    <DialogResponsive
      open={open}
      setOpen={setOpen}
      dialogClassname={cn("h-[560px]")}
      sheetClassname={cn("max-h-[90vh]")}
      trigger={<Button>Installment</Button>}
    >
      <div className="flex flex-col h-full gap-4 p-4">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-center">
            Trả góp qua thẻ tín dụng
          </DialogTitle>
        </DialogHeader>
        {/* Select Crypto */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full z-50 transition-transform duration-300 ease-in-out -translate-x-full bg-white dark:bg-gray-800",
            openTerms ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col w-full flex-1 h-full">
            <div className="flex items-center w-full justify-between px-4 py-3 border-b border-b-gray-100">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenTerms(false)}
              >
                <IconCustom icon="tabler:chevron-left" className="size-4" />
              </Button>
              <h2 className="text-lg font-semibold">Thanh toán</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <IconCustom icon="tabler:x" className="size-4" />
              </Button>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none w-full gap-2">
              <div className="p-4 pb-0 flex flex-1 flex-col gap-5 items-center justify-center">
                <p className="animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%] text-lg font-bold -mt-5">
                  Comming Soon
                </p>
              </div>
            </div>
            <div className="p-4 flex flex-col w-full gap-2">
              <Button disabled className="w-full h-10 rounded-lg">
                Xác nhận đã thanh toán
              </Button>
            </div>
          </div>
        </div>

        <div className="relative">
          <Input
            placeholder="Tìm tên ngân hàng"
            className="pr-10 border-none bg-[#F5F5FA] rounded-full"
          />
          <Search className="size-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="flex-1 overflow-y-scroll scrollbar-none mb-auto">
          <Accordion defaultValue={0}>
            {installments.map((e, i) => {
              return (
                <Tab key={i} index={i}>
                  <Trigger>
                    <div className="flex items-center justify-start gap-2">
                      <img src={e.icon.src} alt={e.name} className="size-11" />
                      <div className="flex items-start flex-col gap-0.5">
                        <p className="text-sm font-bold">{e.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {e.description}
                        </p>
                      </div>
                    </div>
                  </Trigger>
                  <Content>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Chọn mức kỳ hạn</p>
                        <p className="text-sm text-primary font-medium">
                          Xem tất cả
                        </p>
                      </div>

                      <div className="flex items-center overflow-hidden w-full">
                        <div className="flex items-center gap-2 overflow-x-scroll overflow-y-hidden scrollbar-none">
                          {e.terms.map((term, i) => {
                            return (
                              <div
                                key={i}
                                onClick={() => handleSelectBank(term.id)}
                                className={cn(
                                  "relative rounded-lg border w-[248px] min-w-[248px] !h-[136px] flex-shrink-0 cursor-pointer hover:bg-[#F5F5FA]",
                                  bank === term.id
                                    ? "border-2 border-blue-500"
                                    : ""
                                )}
                              >
                                {bank === term.id && (
                                  <div className="absolute top-0 right-0 size-4 bg-blue-700 rounded-bl-lg opacity-50 flex items-center justify-center">
                                    <Check className="size-2 text-white" />
                                  </div>
                                )}
                                <div className="flex w-full items-center justify-between p-3 mb-1 border-b border-b-gray-100 rounded-t-lg bg-[#F5F5FA]">
                                  <p className="text-sm font-medium">
                                    {term.name}
                                  </p>
                                  <p className="text-sm font-semibold">
                                    {FormatCurrency(term.priceOfMonth)}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1 px-3 pb-3">
                                  <div className="flex justify-between items-center">
                                    <p className="text-xs text-muted-foreground">
                                      Giá mua trả góp
                                    </p>
                                    <p className="text-sm">
                                      {FormatCurrency(term.priceOfInstallment)}
                                    </p>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <p className="text-xs text-muted-foreground">
                                      Chênh lệch
                                    </p>
                                    <p className="text-sm">
                                      {FormatCurrency(term.difference)}
                                    </p>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <p className="text-xs text-muted-foreground">
                                      Lãi suất
                                    </p>
                                    <p className="text-sm">
                                      {term.interestRate}%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Content>
                </Tab>
              );
            })}
          </Accordion>
        </div>
        <div className="w-full">
          <Button
            disabled={!bank}
            onClick={() => setOpenTerms(true)}
            className="w-full h-10 rounded-lg disabled:bg-gray-200 disabled:text-gray-500"
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </DialogResponsive>
  );
};

export default Installment;
