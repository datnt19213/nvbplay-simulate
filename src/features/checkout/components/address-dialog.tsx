import { Map } from "@/assets/icons";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { FC, HTMLAttributes, useState } from "react";
import RadioCard from "@/components/base-components/radios";
import { AddressTagItem } from "@/features/profile/components/address-list";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import IconCustom from "@/components/common-components/icon-custom";

const AddressDialog = ({
  handleUpdateAddress,
}: {
  handleUpdateAddress: (item: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const { listAddress, userAddress } = useSelector(
    (state: RootState) => state.users_address_data
  );
  const [location, setLocation] = useState(userAddress?.id);
  return (
    <DialogResponsive
      sheetClassname="max-h-[90vh]"
      trigger={
        <div className="flex items-center gap-2">
          <img src={Map.src} className="w-5 h-5" alt="" />
          <span className="font-medium text-sm text-blue-hovered cursor-pointer">
            Chọn từ sổ địa chỉ
          </span>
        </div>
      }
      open={open}
      setOpen={setOpen}
    >
      <div className="p-4 flex flex-col h-full">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-center">Chọn địa chỉ</DialogTitle>
        </DialogHeader>
        <div className="h-full flex-1 py-4 flex flex-col gap-4 overflow-y-auto scrollbar-none">
          <RadioGroup
            className="w-full"
            value={location}
            onValueChange={setLocation}
          >
            <div className="grid grid-cols-1 gap-2">
              {listAddress?.map((item: any, index: number) => (
                <Label
                  key={index}
                  htmlFor={item.id}
                  className="rounded-lg border [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600  p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative"
                >
                  {location === item.id && (
                    <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
                      <IconCustom icon="ph:check" className="size-2.5" />
                    </div>
                  )}
                  <RadioGroupItem
                    value={item.id}
                    id={item.id}
                    className="text-blue-600 border-blue-600 peer"
                  />
                  <div className="w-full">
                    <div className="flex items-center gap-3 ">
                      <div className="size-8 rounded-full bg-[#EBEBF0] flex items-center justify-center">
                        <IconCustom
                          icon="tabler:map-pin-filled"
                          className="size-6 text-primary stroke-[1.5] stroke-white"
                        />
                      </div>
                      <div className="flex flex-col desktop:flex-row desktop:justify-between w-full items-start desktop:items-end gap-2">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium">
                            {item.first_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.address_1}, {item.city}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          {item?.metadata?.type === "house" ? (
                            <div className="flex items-center justify-center rounded px-1 py-0.5 text-xs font-medium bg-blue-100 text-blue-500">
                              Nhà riêng
                            </div>
                          ) : (
                            <div className="flex items-center justify-center rounded px-1 py-0.5 text-xs font-medium bg-blue-100 text-blue-500">
                              Văn phòng
                            </div>
                          )}
                          {item.is_default_shipping && (
                            <div className="flex items-center justify-center rounded px-1 py-0.5 text-xs font-medium bg-red-100 text-red-500">
                              Mặc định
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end">
          <Button
            disabled={location === userAddress?.id}
            className="w-full"
            onClick={() => {
              if (location != userAddress?.id) {
                const address = listAddress.find(
                  (item: any) => item.id === location
                );
                handleUpdateAddress(address);
                setOpen(false);
              }
            }}
          >
            Chọn
          </Button>
        </div>
      </div>
    </DialogResponsive>
  );
};

export default AddressDialog;

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
