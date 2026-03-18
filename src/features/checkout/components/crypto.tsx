import {
  Bitcoin,
  coin,
  Copy,
  Doge,
  Ethereum,
  JCB,
  MasterCard,
  Solana,
  Tether,
  Tether2,
  Visa,
} from "@/assets/icons";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import React, { useState } from "react";
import CreditCardForm from "./credit-card-form";
import { FormatCurrency } from "@/utilities/text";

const cryptos = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    code: "BTC",
    icon: Bitcoin,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    code: "ETH",
    icon: Ethereum,
  },
  {
    id: "tether",
    name: "Tether US",
    code: "USDT",
    icon: Tether,
  },
  {
    id: "doge",
    name: "Doge",
    code: "DOGE",
    icon: Doge,
  },
  {
    id: "solana",
    name: "Solana",
    code: "SOL",
    icon: Solana,
  },
  {
    id: "tether2",
    name: "Tether US",
    code: "TRC20",
    icon: Tether2,
  },
];

const CryptoSelection = () => {
  const [open, setOpen] = useState(false);
  const [crypto, setCrypto] = useState("");
  const [isSelectCrypto, setIsSelectCrypto] = useState(false);
  return (
    <DialogResponsive
      open={open}
      setOpen={setOpen}
      dialogClassname={cn({
        "h-fit": !isSelectCrypto,
        "h-[90vh]": isSelectCrypto,
      })}
      sheetClassname={cn({
        "max-h-[400px]": !isSelectCrypto,
        "max-h-[90vh]": isSelectCrypto,
      })}
      trigger={<Button>Crypto</Button>}
    >
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto p-4 mb-auto">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-center">Chọn cryptocurrency</DialogTitle>
        </DialogHeader>
        {/* Select Crypto */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full z-50 transition-transform duration-300 ease-in-out -translate-x-full bg-white dark:bg-gray-800",
            isSelectCrypto ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col w-full flex-1 h-full">
            <div className="flex items-center w-full justify-between px-4 py-3 border-b border-b-gray-100">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSelectCrypto(false)}
              >
                <IconCustom icon="tabler:chevron-left" className="size-4" />
              </Button>
              <h2 className="text-lg font-semibold">
                Thanh toán với{" "}
                {cryptos.find((item) => item.id === crypto)?.name}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <IconCustom icon="tabler:x" className="size-4" />
              </Button>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none w-full gap-2">
              <div className="p-4 pb-0 flex flex-1 flex-col gap-5">
                <div className="flex flex-col gap-4 p-4 items-center justify-center">
                  <h4 className="text-sm font-semibold">Số tiền thanh toán</h4>
                  <p className="text-sm text-muted-foreground">
                    {FormatCurrency(1370000)}
                  </p>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <img src="/qr.svg" alt="qr" className="size-[140px]" />
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-sm">Mạng</p>
                      <p className="text-sm font-semibold">
                        {cryptos.find((item) => item.id === crypto)?.name} -{" "}
                        {cryptos.find((item) => item.id === crypto)?.code}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full items-start gap-2">
                    <div className="flex justify-between items-end w-full gap-3 py-2 px-4 bg-[#F5F5FA] rounded-lg">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xs text-muted-foreground">
                          Địa chỉ (Nhấn chọn để sao chép)
                        </p>
                        <p className="text-base font-bold">
                          46467HHasdsadqweD11c04mmjklaw
                        </p>
                      </div>
                      <Button size="icon" variant="ghost">
                        <img src={Copy.src} alt="copy" className="size-6" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <IconCustom
                        icon="tabler:info-triangle"
                        className="size-4"
                      />
                      Tiền sẽ bị mất khi giao dịch qua mạng khác.
                    </p>
                  </div>
                  <div className="p-4 gap-4 rounded-lg border flex flex-col items-start w-full">
                    <p className="text-base font-semibold flex items-center justify-start gap-1 w-full">
                      <IconCustom
                        icon="tabler:calculator-filled"
                        className="size-6"
                      />
                      Tỷ giá quy đổi
                    </p>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between items-center gap-2 w-full">
                        <div className="flex items-center flex-1 py-4 pr-4 pl-2 gap-2 bg-[#F5F5FA] rounded-lg">
                          <img src={coin.src} className="size-6" />
                          <p className="text-base font-semibold">10000</p>
                        </div>
                        <IconCustom
                          icon="tabler:arrows-right-left"
                          className="size-4 text-muted-foreground"
                        />
                        <div className="flex items-center flex-1 py-4 pr-4 pl-2 gap-2 bg-[#F5F5FA] rounded-lg">
                          <img src={Bitcoin.src} className="size-6" />
                          <p className="text-base font-semibold truncate line-clamp-1">
                            0.00051888141983
                          </p>
                          <IconCustom icon="tabler:copy" className="size-6" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tỷ giá được cập nhật gần nhất vào lúc 22:00 ngày
                        11/04/2024.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col w-full gap-2">
              <Button className="w-full h-10 rounded-lg">
                Xác nhận đã thanh toán
              </Button>
            </div>
          </div>
        </div>

        <div className="border-b border-b-gray-100" />
        <RadioGroup className="w-full" value={crypto} onValueChange={setCrypto}>
          <div className="grid grid-cols-3 gap-2">
            {cryptos.map((item, index) => (
              <Label
                key={index}
                htmlFor={item.id}
                onClick={() => setIsSelectCrypto(true)}
                className="rounded-lg border [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600  p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative"
              >
                <RadioGroupItem
                  value={item.id}
                  id={item.id}
                  className="text-blue-600 border-blue-600 peer sr-only"
                />

                <div className="flex w-full flex-col items-center justify-center gap-3 ">
                  <img
                    src={item.icon.src}
                    alt={item.name}
                    className="size-10"
                    loading="lazy"
                  />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.code}</p>
                  </div>
                </div>
              </Label>
            ))}
          </div>
        </RadioGroup>
      </div>
    </DialogResponsive>
  );
};

export default CryptoSelection;
