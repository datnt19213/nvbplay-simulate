import { Location } from "@/assets/icons";
import AddNewItem from "@/components/base-components/cta/add-new-item";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import AddressForm from "@/components/base-components/header/address/address-form";
import TextInput from "@/components/base-components/input/text-input";
import RadioCard from "@/components/base-components/radios";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressTagItem } from "@/features/profile/components/address-list";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { setIsOtherCustomerReceiveOther } from "@/stores/checkout";
import { FC, HTMLAttributes, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressDialog from "./address-dialog";

const OrderAddress = ({
  address,
  userAddress,
  activeAddress,
  setActiveAddress,
}: {
  address: any;
  userAddress: any;
  activeAddress: any;
  setActiveAddress: (address: any) => void;
}) => {
  const { isOtherCustomerReceiveOrder } = useSelector(
    (state: RootState) => state.checkout
  );
  const { user } = useSelector((state: RootState) => state.users_data);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const validAddresses = useMemo(() => {
    return address?.filter(
      (address: any) =>
        address?.metadata &&
        Object.keys(address?.metadata).length > 0 && // Metadata không rỗng
        address?.country_code &&
        address?.country_code !== "<string>" // Country code khác "<string>"
    );
  }, [address]);

  const renderingAddress = useMemo(() => {
    if (!validAddresses || validAddresses.length === 0) return [];
    // console.log("VALID ADDRESS:", validAddresses);

    const defaultAddress = validAddresses.find(
      (item: any) => item.is_default_shipping === true
    );

    // Địa chỉ khác (ưu tiên `activeAddress` nếu có)
    const otherAddress =
      (activeAddress &&
        activeAddress.is_default_shipping === false &&
        activeAddress) ||
      (validAddresses[validAddresses?.length - 1] &&
        !validAddresses[validAddresses?.length - 1].is_default_shipping &&
        validAddresses[validAddresses?.length - 1]) ||
      undefined;

    const limitedAddresses = otherAddress
      ? [defaultAddress, otherAddress]
      : [defaultAddress];

    return limitedAddresses;
  }, [validAddresses, activeAddress, userAddress]);

  const handleUpdateAddress = (item: any) => {
    setActiveAddress(item);
  };

  return (
    <div className="w-full py-4">
      <div className="px-4">
        <div className="h-14 w-full flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Location.src} className="w-5 h-5" alt="" />
            <span className="font-semibold">Địa chỉ nhận hàng</span>
          </div>
          <AddressDialog handleUpdateAddress={handleUpdateAddress} />
        </div>
      </div>
      <div className="px-4 pb-4">
        {user && (
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3 mb-3">
            {renderingAddress?.map((item: any, index: number) => (
              <RadioCard
                key={index}
                id={`address-${index}`}
                name="order-address"
                className="cursor-pointer"
                isChecked={activeAddress?.id === item.id}
                onClick={() => {
                  handleUpdateAddress(item);
                }}
              >
                <AddressItem
                  title={`${item.first_name}`}
                  address={item.address_1 + ", " + item?.city}
                  phone={item.phone}
                  isDefault={item.is_default_shipping}
                />
              </RadioCard>
            ))}
            <DialogResponsive
              trigger={
                <AddNewItem className="h-[160px]">Thêm địa chỉ mới</AddNewItem>
              }
              dialogClassname="!rounded-lg overflow-hidden"
              open={open}
              setOpen={setOpen}
            >
              <AddressForm
                setOpen={setOpen}
                isOpen={open}
                setActiveAddress={setActiveAddress}
              />
            </DialogResponsive>
          </div>
        )}
        {!user && (
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-2 col-span-1">
              <span className="text-gray-icon font-medium text-sm">
                Họ và tên
              </span>
              <TextInput
                placeholder="Nhập tên người nhận"
                className="bg-gray-primary !border-none"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <span className="text-gray-icon font-medium text-sm">
                Số điện thoại
              </span>
              <TextInput
                placeholder="Nhập số điện thoại"
                className="bg-gray-primary !border-none"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1 desktop:col-span-2">
              <span className="text-gray-icon font-medium text-sm">Số nhà</span>
              <TextInput
                placeholder="Số nhà (Ví dụ: Số 1, đường Nguyễn Văn Linh)"
                className="bg-gray-primary !border-none"
              />
            </div>
          </div>
        )}
      </div>
      {/* <div
        className={cn(
          "px-4 transition-all duration-500 border-t border-gray-border",
          isOtherCustomerReceiveOrder
            ? "pt-4 border-opacity-100"
            : "border-opacity-0"
        )}
      >
        <div
          className={cn(
            " rounded-lg flex flex-col gap-3 border-dashed transition-all duration-500",
            isOtherCustomerReceiveOrder
              ? "p-4 mt-3 border-opacity-100 border"
              : "border-opacity-0 border-0"
          )}
        >
          <div
            className={cn(
              "flex gap-2 transition-all duration-500",
              !isOtherCustomerReceiveOrder && " -mt-4 delay-200"
            )}
          >
            <Checkbox
              checked={isOtherCustomerReceiveOrder}
              className={cn(
                "size-5 rounded-[4px] bg-white border-[#DDDDE3] accent-gray-primary checked:!accent-txtprimary data-[state=checked]:bg-blue-hovered"
              )}
              onCheckedChange={() =>
                dispatch(
                  setIsOtherCustomerReceiveOther(!isOtherCustomerReceiveOrder)
                )
              }
            />

            <span className="text-gray-fifth font-medium">
              Nhờ người khác nhận hàng
            </span>
          </div>
          {isOtherCustomerReceiveOrder && (
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3 w-full animate-fade-up">
              <div className="flex flex-col gap-2">
                <span className="text-gray-icon font-medium text-sm">
                  Tên người nhận
                </span>
                <TextInput
                  placeholder="Nhập tên người nhận"
                  className="bg-gray-primary !border-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-icon font-medium text-sm">
                  Số điện thoại
                </span>
                <TextInput
                  placeholder="Nhập số điện thoại"
                  className="bg-gray-primary !border-none"
                />
              </div>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default OrderAddress;

type AddressItemProps = {
  title: string;
  address: string;
  phone: string;
  isDefault: boolean;
  onClick?: () => void;
} & HTMLAttributes<HTMLSpanElement>;
const AddressItem: FC<AddressItemProps> = ({
  address,
  phone,
  title,
  onClick,
  isDefault,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="w-full flex justify-between items-center">
        <p className="flex items-center divide-x">
          <span className="font-semibold">{title}</span>
          {/* <span className="text-sm font-medium text-gray-icon">{phone}</span> */}
        </p>
        <span
          className="text-blue-hovered cursor-pointer text-sm font-semibold"
          {...props}
        >
          Nhà riêng
        </span>
      </div>
      <span className="text-sm font-medium text-gray-icon">{phone}</span>
      <span className="text-sm font-medium text-gray-icon">{address}</span>
      {isDefault && (
        <div className="flex items-center gap-1 mt-2.5">
          <AddressTagItem
            name="Mặc định"
            color="#FF3F1A"
            background="#FFF0F1"
          />
        </div>
      )}
    </div>
  );
};
