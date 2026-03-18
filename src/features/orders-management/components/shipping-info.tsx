"use client";
import { toastNVB } from "@/components/base-components/toast";
import { Icon } from "@/components/common-components";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { Combiner } from "@/utilities/combiner";
import { formatDateToDDMMYYYY } from "@/utilities/date";
import { CapitalizeFirstLetter } from "@/utilities/text";
import { translate } from "@/utilities/translator";
import { addDays } from "date-fns";
import { Copy, Dot, MapPin, Truck } from "lucide-react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { LocationAction, StatusOrder } from "../elements";

const ShippingInfo = ({ shipment }: { shipment: any }) => {
  const copyClipboard = (value: any) => {
    navigator.clipboard.writeText(value);
    toastNVB({ msg: "Copied to clipboard", type: "success" });
  };
  const { orderDetail } = useSelector(
    (state: RootState) => state.order_data_slice
  );

  return (
    <div className="flex w-full gap-3 flex-col desktop:flex-row">
      <div className="w-full bg-white rounded-lg py-4 flex flex-col gap-3">
        <div className="w-full flex flex-col gap-0.5">
          <div className="flex justify-between px-4 items-center h-[30px]">
            <span className="font-semibold">Thông tin đơn hàng</span>
            <StatusOrder status={orderDetail?.status || "draft"}>
              {CapitalizeFirstLetter(translate(orderDetail?.status)) || "-"}
            </StatusOrder>
          </div>
          <div className="flex flex-col px-4 ">
            <div className="font-semibold text-txtthird flex items-center gap-2">
              # {CapitalizeFirstLetter(orderDetail?.id || "-")}
              <Copy
                className="text-txtfifth cursor-pointer"
                size={24}
                onClick={() => copyClipboard(orderDetail?.id || "-")}
              />
            </div>
            <span className="font-medium text-sm">
              Giao hàng bởi: {orderDetail?.shipping_methods?.[0]?.name || "-"}
            </span>
          </div>
        </div>
        {/* <hr className="h-[1px] w-full bg-gray-border" />
        <div className="w-full px-4 flex flex-col gap-4">
          <div className="flex justify-between flex-col items-start">
            <span className="font-semibold text-txtfifth">
              Thông tin đơn hàng
            </span>
            <span className="text-sm font-medium text-txtsecondary">
              {orderDetail?.shipping_methods?.[0]?.data?.expected}
            </span>
          </div>
          <RoadLine />
          <TimeLineShipping orderDetail={orderDetail} />
        </div> */}
      </div>
      <ShippingAddress
        shippingInfo={orderDetail?.shipping_address}
        metadata={orderDetail?.metadata}
      />
    </div>
  );
};

export default ShippingInfo;

const TimeLineShipping = ({ orderDetail }: { orderDetail: any }) => {
  return (
    <div className="flex flex-col  w-full pt-2 overflow-hidden">
      <div className="flex w-full h-fit gap-4">
        <div className="flex flex-col min-w-[88px] -mt-2 text-sm font-medium text-gray-icon w-fit items-end">
          <span>
            {formatDateToDDMMYYYY(orderDetail?.created_at || new Date())}
          </span>
          <span>11:04</span>
        </div>
        <div
          className={cn(
            "flex w-full pl-4 text-sm font-medium h-full border-l min-h-12 border-gray-[#C4C4CF] relative before:absolute before:content[] before:bg-[#c4c4cf] before:rounded-full before:w-2 before:h-2 before:-left-[4px] before:top-0",
            "text-[#079449] before:bg-[#079449]"
          )}
        >
          <span className="-mt-2">Đơn hàng đã được tạo thành công</span>
        </div>
      </div>
      <div className="flex w-full h-fit gap-4">
        <div className="flex flex-col min-w-[88px] -mt-2 text-sm font-medium text-gray-icon w-fit items-end">
          <span>
            {formatDateToDDMMYYYY(
              addDays(new Date(), 5).toLocaleDateString() ||
                new Date().toLocaleDateString()
            )}
          </span>
          <span>20:26</span>
        </div>
        <div
          className={cn(
            "flex w-full pl-4 text-sm font-medium h-full border-l border-gray-[#C4C4CF] relative before:absolute before:content[] before:bg-[#c4c4cf] before:rounded-full before:w-2 before:h-2 before:-left-[4px] before:top-0"
          )}
        >
          <span className="-mt-2">Chờ xác nhận</span>
        </div>
      </div>
      <div className="w-fit flex items-center text-sm font-semibold mx-auto mt-4 cursor-pointer gap-2">
        Xem thêm <Icon icon="ph:caret-down" fontSize={20} />
      </div>
    </div>
  );
};
const RoadLine = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="py-1.5 px-3 rounded-full border border-gray-border text-nowrap flex items-center gap-2">
        <Truck size={24} />
        Cần thơ
      </div>
      <div className="w-full flex items-center justify-center">
        <Dot />
        <hr className="border border-dashed min-w-[100px] md:min-w-[200px] h-[1px]" />
        <Icon icon="ph:play-fill" fontSize={8} />
      </div>
      <div className="py-1.5 px-3 rounded-full border border-gray-border text-nowrap flex items-center gap-2">
        <MapPin size={24} />
        Hà nội
      </div>
    </div>
  );
};

type ShippingAddressProps = {
  shippingInfo: any;
  metadata: any;
};
const ShippingAddress: FC<ShippingAddressProps> = ({
  shippingInfo,
  metadata,
}) => {
  return (
    <div className="w-full bg-white rounded-lg py-3 flex flex-col gap-4 min-w-[360px] md:w-[360px] px-3">
      <span className="font-semibold">Địa chỉ giao hàng</span>
      <LocationAction className="flex gap-2">
        <div className="flex flex-col ">
          <div className="flex text-sm gap-1 desktop:gap-3">
            <span className="font-semibold">
              {shippingInfo?.first_name || "-"}
            </span>
            <span className="font-medium">{shippingInfo?.phone || "-"}</span>
            <Badge className="bg-[#F2F7FF] text-blue-hovered hover:bg-[#F2F7FF]  text-xs font-semibold">
              Nhà riêng
            </Badge>
          </div>
          <span className="text-sm font-medium text-gray-icon">
            {Combiner({
              address: shippingInfo?.address_1,
              district: shippingInfo?.province,
              city: shippingInfo?.city,
            })}
          </span>
        </div>
      </LocationAction>
      <hr className="w-full bg-gray-border h-[1px]" />
      <div className="bg-gray-primary rounded-lg p-4 w-full flex flex-col gap-3">
        <span className="font-semibold">Lời nhắn</span>
        <span className="font-medium text-sm text-gray-icon text-wrap w-full">
          {metadata?.note || "-"}
        </span>
      </div>
    </div>
  );
};
