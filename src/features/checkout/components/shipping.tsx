import Image from "@/components/base-components/images/image";
import RadioCard from "@/components/base-components/radios";
import { Icon } from "@/components/common-components";
import IconCustom from "@/components/common-components/icon-custom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { getGoShipRate } from "@/services/addresses";
import { FormatCurrency } from "@/utilities/text";
import React, { useEffect, useState } from "react";
import ShippingDialog from "./shipping-dialog";

const Shipping = ({
  order,
  shipping,
  setShipping,
  activeAddress,
}: {
  order: any;
  shipping: any;
  setShipping: any;
  activeAddress: any;
}) => {
  const [rate, setRate] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const DEFAULT_ADDRESS = {
    district: "900100",
    city: "900000",
  };

  useEffect(() => {
    if (activeAddress && order) {
      setIsLoading(true);
      const fetchRate = async () => {
        const data = {
          shipment: {
            address_from: DEFAULT_ADDRESS,
            address_to: {
              district: activeAddress.metadata.district_id,
              city: activeAddress.metadata.city_id,
            },
            parcel: {
              cod: order.total,
              amount: order.total,
              width: 10,
              height: 10,
              length: 10,
              weight: 750,
            },
          },
        };
        const response = await getGoShipRate(data);
        if (response) {
          setRate(response.data);
          setShipping(response.data[0]);
        }
        setIsLoading(false);
      };
      fetchRate();
    }
  }, [activeAddress, order]);
  //   }, [activeAddress, order]);
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-lg font-semibold">
              Hình thức vận chuyển
            </span>
            <ShippingDialog />
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-[160px] rounded" />
              ))}
            </div>
          ) : (
            <>
              {rate && rate.length > 0 ? (
                <div className="flex overflow-x-auto gap-3 py-4">
                  <RadioGroup
                    value={shipping?.id}
                    onValueChange={(value) =>
                      setShipping(rate.find((item: any) => item.id === value))
                    }
                  >
                    {rate.map((item: any, index: number) => (
                      <Label
                        key={index}
                        htmlFor={item.id}
                        className="rounded-lg border [&:has([data-state=checked])]:border-2 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative !w-[287px]"
                      >
                        {shipping?.id === item.id && (
                          <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
                            <Icon icon="ph:check" className="size-2.5" />
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
                          className="text-blue-600 border-blue-600 peer sr-only"
                        />
                        <div className="flex flex-col gap-2 h-full w-full py-3 px-4">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold">{item.service}</h3>
                            <p className="flex gap-2 items-center">
                              <span className="text-primary font-semibold">
                                {FormatCurrency(item.total_fee)}
                              </span>
                              {/* <span className="text-sm text-muted-foreground line-through">
                                {FormatCurrency(item.total_amount)}
                              </span> */}
                            </p>
                          </div>
                          <div className="border-b-2 border-dashed" />
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-muted-foreground">
                                Giao bởi:
                              </p>
                              <p className="text-sm flex gap-2 items-center font-medium">
                                {item.carrier_name}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                              <Icon
                                icon="tabler:truck-delivery"
                                className="size-4"
                              />
                              <p className="text-xs font-medium">
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
                  </RadioGroup>
                </div>
              ) : (
                <p className="text-sm">
                  Không tìm thấy đơn vị vận chuyển nào phù hợp
                </p>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Shipping;
