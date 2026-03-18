import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import React, { useMemo, useState } from "react";
import { FormatCurrency } from "@/utilities/text";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const rateShipping = [
  {
    id: "Nl84XzkzOA==",
    carrier_name: "Viettel Post",
    carrier_logo:
      "https:\/\/api.goship.io\/storage\/images\/carriers\/vtpost_c.png",
    service: "Tiết kiệm",
    expected: "Dự kiến giao trong 5 ngày",
    cod_fee: "22000",
    total_fee: "17000",
    total_amount: "39000",
  },
  {
    id: "MTFfN181OTg=",
    carrier_name: "Giao Hàng Tiết Kiệm",
    carrier_logo:
      "https:\/\/api.goship.io\/storage\/images\/carriers\/ghtk_c.png",
    service: "Nhanh",
    expected: "Dự kiến giao trong 2 ngày",
    cod_fee: "0",
    total_fee: "18000",
    total_amount: "39000",
  },
  {
    id: "MTFfN188OTg=",
    carrier_name: "Viettel Post",
    carrier_logo:
      "https:\/\/api.goship.io\/storage\/images\/carriers\/vtpost_c.png",
    service: "Hỏa tốc",
    expected: "Dự kiến giao trong 2 ngày",
    cod_fee: "0",
    total_fee: "18000",
    total_amount: "39000",
  },
  {
    id: "MTFfNS181OTg=",
    carrier_name: "Viettel Post",
    carrier_logo:
      "https:\/\/api.goship.io\/storage\/images\/carriers\/vtpost_c.png",
    service: "Hỏa tốc",
    expected: "Dự kiến giao trong 2 ngày",
    cod_fee: "0",
    total_fee: "18000",
    total_amount: "39000",
  },
];

const ShippingDialog = () => {
  const [open, setOpen] = useState(false);
  const [groupService, setGroupService] = useState<any>();
  const [rate, setRate] = useState<any>();
  const [isAddNewCard, setIsAddNewCard] = useState(false);

  const groupedData = useMemo(() => {
    return rateShipping.reduce((acc: any, item: any) => {
      if (!acc[item.service]) {
        acc[item.service] = [];
      }

      acc[item.service].push(item);
      return acc;
    }, {});
  }, [rateShipping]);

  return (
    <DialogResponsive
      open={open}
      setOpen={setOpen}
      dialogClassname={cn("h-[540px] w-[480px]")}
      trigger={
        <Button variant="ghost">
          <p className="text-sm font-medium text-muted-foreground">
            Xem tất cả
          </p>
        </Button>
      }
    >
      <div className="flex w-full flex-col h-full gap-4 p-4 pb-3">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-center">
            Hình thức vận chuyển
          </DialogTitle>
        </DialogHeader>

        {/* SELECT SHIPPING */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full z-50 transition-transform duration-300 ease-in-out -translate-x-full bg-white dark:bg-gray-800",
            isAddNewCard ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="relative w-full h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-b-gray-100">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAddNewCard(false)}
              >
                <IconCustom icon="tabler:chevron-left" className="size-4" />
              </Button>
              <h2 className="text-lg font-semibold">Đơn vị vận chuyển</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <IconCustom icon="tabler:x" className="size-4" />
              </Button>
            </div>

            <div className="p-4 pb-0 flex flex-col flex-1 gap-2 overflow-y-auto scrollbar-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <p>Hình thức:</p>
                  <p className="text-primary">{groupService?.key}</p>
                </div>
                <p
                  className="text-sm text-muted-foreground font-medium hover:text-primary hover:underline transition-colors duration-300 cursor-pointer"
                  onClick={() => setIsAddNewCard(false)}
                >
                  Thay đổi
                </p>
              </div>
              <div className="flex flex-col flex-1 h-full py-3">
                {groupService?.value && groupService?.value.length > 0 ? (
                  <RadioGroup
                    value={rate?.id}
                    onValueChange={(value) =>
                      setRate((prev: any) => ({ ...prev, id: value }))
                    }
                  >
                    <div className="grid grid-cols-1 gap-3 h-full">
                      {groupService?.value.map((item: any, index: number) => (
                        <Label
                          key={index}
                          htmlFor={item.id}
                          className="rounded-lg border [&:has([data-state=checked])]:border-2 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative py-3 px-4"
                        >
                          {rate?.id === item.id && (
                            <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
                              <IconCustom
                                icon="ph:check"
                                className="size-2.5"
                              />
                            </div>
                          )}
                          <div className="absolute -top-2.5 left-3 z-50 h-[18px] w-[78px] rounded bg-[#079449] flex items-center p-1 gap-1">
                            <IconCustom
                              icon="tabler:thumb-up-filled"
                              className="text-white"
                              fontSize={16}
                            />
                            <p className="text-white text-[11px] font-semibold">
                              Phổ biến
                            </p>
                          </div>
                          <RadioGroupItem
                            value={item.id}
                            id={item.id}
                            className="text-blue-600 border-blue-600 peer"
                          />
                          <div className="flex flex-col gap-2 h-full w-full">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-semibold">
                                {item.carrier_name}
                              </h3>
                              <p className="flex gap-2 items-center">
                                <span className="text-primary font-semibold">
                                  {FormatCurrency(item.total_fee)}
                                </span>
                              </p>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">
                                  {item.expected}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-center rounded p-[1px] bg-[#E95F81] max-w-[117px] !max-h-[20px]">
                              <div className="size-5 px-[1px0] flex items-center justify-center">
                                <IconCustom
                                  icon="tabler:gift-filled"
                                  className="text-white"
                                  fontSize={16}
                                />
                              </div>
                              <div className="text-[#4A1928] bg-[#FFF2F9] h-full w-full text-[11px] font-semibold px-1.5 gap-2 rounded-[3px] flex items-center justify-center">
                                Khách hàng mới
                              </div>
                            </div>
                          </div>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  <p className="text-sm">
                    Không tìm thấy đơn vị vận chuyển nào phù hợp
                  </p>
                )}
              </div>
            </div>
            <div className="p-4 flex items-center justify-center">
              <Button className="w-full rounded-lg">Xác nhận</Button>
            </div>
          </div>
        </div>
        <div className="border-b border-b-gray-100" />

        <div className="grid grid-cols-1 gap-2 h-full py-3 overflow-y-auto scrollbar-none">
          {Object.entries(groupedData).map(([service, items], index) => (
            <div
              key={index}
              onClick={() => {
                setIsAddNewCard(true);
                setGroupService({ key: service, value: items });
              }}
              className="rounded-lg border border-gray-3
              00 flex items-center gap-2 cursor-pointer hover:bg-gray-100 relative py-3 px-4"
            >
              {index === 0 && (
                <div className="absolute -top-2.5 left-3 h-[18px] w-[78px] rounded bg-[#079449] flex items-center p-1 gap-1">
                  <IconCustom
                    icon="tabler:thumb-up-filled"
                    className="text-white"
                    fontSize={16}
                  />
                  <p className="text-white text-[11px] font-semibold">
                    Phổ biến
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2 h-full w-full">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold">{service}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-4 text-muted-foreground"
                    >
                      <IconCustom
                        icon="tabler:chevron-right"
                        className="size-4"
                      />
                    </Button>
                  </div>
                  <p className="text-sm text--foreground">
                    Với hình thức này, người mua sẽ sử dụng được dịch vụ vận
                    chuyển với giá thành hợp lý.
                  </p>
                  <div className="flex items-center divide-x divide-gray-200">
                    <p className="text-xs font-medium text-primary pr-2">
                      Từ{" "}
                      <span className="text-lg font-semibold">
                        {FormatCurrency(16500)}
                      </span>
                    </p>
                    <p className="text-xs text-green-600 font-medium pl-2">
                      Nhận hàng vào 11 thg 04 - 17 thg 04
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 items-center rounded p-[1px] bg-[#E95F81] max-w-[117px] !max-h-[20px]">
                  <div className="size-5 px-[1px0] flex items-center justify-center">
                    <IconCustom
                      icon="tabler:gift-filled"
                      className="text-white"
                      fontSize={16}
                    />
                  </div>
                  <div className="text-[#4A1928] bg-[#FFF2F9] h-full w-full text-[11px] font-semibold px-1.5 gap-2 rounded-[3px] flex items-center justify-center">
                    Khách hàng mới
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DialogResponsive>
  );
};

export default ShippingDialog;
