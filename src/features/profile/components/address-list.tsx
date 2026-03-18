"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {Badge} from "@/components/ui/badge";
import {COMMON_DATA} from "@/configs";
import {PersonalLayout} from "@/layouts/component-layouts";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {Combiner} from "@/utilities/combiner";
import {sortByDefaultShipping} from "@/utilities/sorts";
import {useRouter} from "next/navigation";
import React, {FC} from "react";
import {useSelector} from "react-redux";

const AddressList = () => {
  const {user} = useSelector((state: RootState) => state.users_data);
  const router = useRouter();
  const navigateAddressList = () => {
    router.push("/profile/address");
  };

  return (
    <PersonalLayout>
      <div className="flex gap-3">
        <div className="flex  w-full flex-col gap-2">
          <span className="text-lg font-semibold text-txtprimary">Địa chỉ</span>
          <span className="text-sm font-medium text-txtsecondary">
            Để cập nhật địa chỉ của bạn, vui lòng đến trang “Sổ địa chỉ" để thực
            hiện
          </span>
        </div>
        <ButtonSubmitPrimary
          onClickHandle={() => navigateAddressList()}
          className={cn(
            "w-fit bg-gray-border text-gray-icon hover:!bg-gray-border"
          )}
        >
          Sổ địa chỉ
        </ButtonSubmitPrimary>
      </div>
      <div className="flex flex-col gap-3">
        {user &&
          user?.addresses &&
          user?.addresses?.length > 0 &&
          user?.addresses.map((data: any, index: number) => {
            return (
              (data?.is_default_shipping || data?.is_default_billing) && (
                <AddressItem key={index + "adi"} item={data} />
              )
            );
          })}
      </div>
    </PersonalLayout>
  );
};

export default AddressList;

type AddressItemProps = {
  item: any;
};
const AddressItem: FC<AddressItemProps> = ({item}) => {
  return (
    <div className="w-full border border-gray-border rounded-lg p-4 flex flex-col gap-3">
      <div className="w-full flex items-center gap-3">
        <span className="text-txtfifth font-semibold ">{item.first_name}</span>
        <hr className="w-[1px] h-6 bg-gray-border" />
        <span className="font-medium text-gray-icon">{item.phone}</span>
      </div>
      <span className="text-gray-icon font-medium text-sm">
        {Combiner({
          address: item?.address_1,
          district: item?.province,
          city: item?.city,
        })}
      </span>
      <div className="flex items-center gap-2">
        {item?.is_default_shipping && (
          <AddressTagItem
            name="Mặc định"
            background="#FFF0F1"
            color="#D93843"
          />
        )}
        {item?.is_default_billing && (
          <AddressTagItem
            name="Mặc định thanh toán"
            background="#f1f0ff"
            color="#0B74E5"
          />
        )}
      </div>
    </div>
  );
};

type AddressTagItemProps = {
  name: string;
  className?: string;
  color?: "#D93843" | "#0B74E5" | string;
  background?: "#FFF0F1" | "#f1f0ff" | string;
};
export const AddressTagItem: FC<AddressTagItemProps> = ({
  background,
  color,
  name,
  className,
}) => {
  return (
    <Badge
      variant="default"
      style={{
        backgroundColor: `${background}`,
      }}
      className={cn(
        "!rounded-[4px] py-0.5 px-[6px] pointer-events-none select-none w-fit",
        className
      )}
    >
      <span
        style={{
          color: `${color}`,
        }}
        className="text-xs font-semibold  "
      >
        {name}
      </span>
    </Badge>
  );
};
