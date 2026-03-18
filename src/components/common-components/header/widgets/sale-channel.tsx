import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import IconCustom from "../../icon-custom";
import { Store } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSaleChannels } from "@/hooks/queries/sale-channels";
import { SaleChannel as SaleChannelType } from "@/types/sale-channels";
import { RootState } from "@/stores";
import notFound from "@/assets/images/not-found.png";
import {
  setListSaleChannel,
  setActiveSaleChannel,
} from "@/stores/datas/sale-channel-slice";
import Image from "@/components/base-components/images/image";
import { NotRecord } from "@/assets/images";
import useSearchFilter from "@/hooks/useSearchFilter";

const SaleChannel = () => {
  const [open, setOpen] = useState(false);

  const { activeSaleChannel, listSaleChannel } = useSelector(
    (state: RootState) => state.sale_channel
  );
  const [saleChannel, setSaleChannel] = useState<any>(
    activeSaleChannel?.id ? activeSaleChannel.id : ""
  );
  const { dispatchItem, handleClearSelection } = useSearchFilter("selectedSaleChannel");
  const { data, isLoading } = useSaleChannels();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setListSaleChannel(data));
      if (!activeSaleChannel) {
        dispatch(setActiveSaleChannel(data[0]));
      }
    }
  }, [data]);

  useEffect(() => {
    if (activeSaleChannel) {
      setSaleChannel(activeSaleChannel.id);
      handleClearSelection("selectedSaleChannel");
      dispatchItem({
        label: activeSaleChannel.name,
        value: activeSaleChannel.id,
      });
    }
  }, [activeSaleChannel]);

  const handleSelectSaleChannel = (saleChannel: SaleChannelType) => {
    dispatch(setActiveSaleChannel(saleChannel));
    setOpen(false);
  };

  return (
    <DialogResponsive
      trigger={<Trigger />}
      open={open}
      setOpen={setOpen}
      dialogClassname="h-[538px]"
      sheetClassname="h-[90vh]"
    >
      <div className="flex flex-col h-full gap-4">
        <p className="text-lg font-medium text-center border-b p-4">Cửa hàng</p>
        <div className="flex flex-1 items-start justify-start w-full overflow-y-auto scrollbar-none gap-2">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-2">
              <Skeleton className="h-[100px]" />
              <Skeleton className="h-[100px]" />
              <Skeleton className="h-[100px]" />
            </div>
          ) : (
            <>
              {data && data.length > 0 ? (
                <RadioGroup
                  className="w-full px-4"
                  value={saleChannel}
                  onValueChange={(value) => {
                    setSaleChannel(value);
                  }}
                >
                  <div className="grid grid-cols-1 gap-2">
                    {listSaleChannel?.map(
                      (item: SaleChannelType, index: number) => (
                        <Label
                          key={index}
                          htmlFor={item.id}
                          className="rounded-lg border [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600  p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative"
                        >
                          {saleChannel === item.id && (
                            <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
                              <IconCustom
                                icon="ph:check"
                                className="size-2.5"
                              />
                            </div>
                          )}
                          <RadioGroupItem
                            value={item.id}
                            id={item.id}
                            className="text-blue-600 border-blue-600 peer"
                          />
                          <div className="flex items-end flex-1 justify-between">
                            <div className="flex items-center gap-3 ">
                              <div className="size-8 aspect-square rounded-full bg-[#EBEBF0] flex items-center justify-center">
                                <IconCustom
                                  icon="tabler:building-store"
                                  className="size-4 text-primary stroke-[1.5] stroke-white"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">
                                  {item.name}
                                </p>
                                <p
                                  className="text-sm text-muted-foreground"
                                  dangerouslySetInnerHTML={{
                                    __html: item.description.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </Label>
                      )
                    )}
                  </div>
                </RadioGroup>
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="flex flex-col gap-4 items-center justify-center">
                    <Image
                      src={notFound.src}
                      alt="not-record"
                      className="w-[200px] h-full"
                    />
                    <p className="max-w-[300px] text-sm font-medium text-center">
                      Không có cửa hàng nào!
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-end gap-2 border-t px-4 py-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={() => {
              const saleChannelActive = listSaleChannel?.find(
                (item: SaleChannelType) => item.id === saleChannel
              );
              if (saleChannelActive) {
                handleSelectSaleChannel(saleChannelActive);
              }
            }}
            disabled={!saleChannel}
          >
            Chọn
          </Button>
        </div>
      </div>
    </DialogResponsive>
  );
};

export default SaleChannel;

const Trigger = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { activeSaleChannel } = useSelector(
    (state: RootState) => state.sale_channel
  );
  if (isDesktop) {
    return (
      <div className="flex flex-col gap-0.5 cursor-pointer max-w-[150px]">
        <p className="text-xs text-muted-foreground">Cửa hàng</p>
        <div className="flex items-center gap-1.5">
          <div className="aspect-square size-4  flex items-center justify-center">
            <Store className="size-4" />
          </div>
          <p className="text-sm line-clamp-1">
            {activeSaleChannel?.name || "Của hàng"}
          </p>
        </div>
      </div>
    );
  }
  return (
    <Button variant="ghost" size="icon">
      <Store className="size-6 flex lg:hidden" />
    </Button>
  );
};
