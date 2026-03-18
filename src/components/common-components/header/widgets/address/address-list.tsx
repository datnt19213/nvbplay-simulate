import { Icon } from "@iconify/react";
import { AddressModalType } from "./type";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { updateUserAddressData } from "@/services/addresses";
import { useDispatch, useSelector } from "react-redux";
import notFound from "@/assets/images/not-found.png";
import {
  setListAddress,
  setUserAddressData,
} from "@/stores/datas/addresses-data-slice";
import Link from "next/link";
import { RootState } from "@/stores";
import { useRouter } from "next/navigation";
import { NotRecord } from "@/assets/images";
import { ToastDismiss, ToastSuccess } from "@/components/base-components/toast";
import Image from "@/components/base-components/images/image";

interface AddressListProps extends AddressModalType {
  defaultAddress: any;
  isLoading: boolean;
  setOpenRoot: (open: boolean) => void;
}
const AddressList = ({
  setOpenRoot,
  setOpen,
  defaultAddress,
  isLoading,
}: AddressListProps) => {
  const [location, setLocation] = useState(
    defaultAddress ? defaultAddress.id : ""
  );

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.users_data);
  const { listAddress } = useSelector(
    (state: RootState) => state.users_address_data
  );
  const [isLoadingApply, setIsLoadingApply] = useState(false);

  const handleApply = async () => {
    if (location !== defaultAddress?.id) {
      setIsLoadingApply(true);
      const response = await updateUserAddressData(location, {
        is_default_shipping: true,
      });
      if (response) {
        setIsLoadingApply(false);
        setOpenRoot(false);
        ToastDismiss();
        ToastSuccess({
          msg: "Thay đổi địa chỉ thành công",
          className: "",
        });
        const addressDefault = response.customer.addresses.find(
          (item: any) => item.is_default_shipping
        );
        dispatch(setListAddress(response.customer.addresses));
        dispatch(setUserAddressData(addressDefault));
      }
    }
  };

  useEffect(() => {
    setLocation(defaultAddress ? defaultAddress.id : "");
  }, [defaultAddress]);

  return (
    <div className="flex flex-col h-[94%]">
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none    w-full gap-2">
        <div className="w-full flex items-center justify-between border-t p-4">
          {user && (
            <>
              <h5 className="font-semibold text-base">Danh sách địa chỉ</h5>
              <Link href="/profile/personal-info/address">
                <p className="flex items-center gap-2 text-blue-500 text-sm cursor-pointer">
                  <Icon icon="ph:map-trifold" className="size-5" />
                  Sổ điạ chỉ
                </p>
              </Link>
            </>
          )}
        </div>

        {user ? (
          <>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-2">
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
              </div>
            ) : (
              <RadioGroup
                className="w-full px-4"
                value={location}
                onValueChange={(value) => {
                  setLocation(value);
                }}
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
                          <Icon icon="ph:check" className="size-2.5" />
                        </div>
                      )}
                      <RadioGroupItem
                        value={item.id}
                        id={item.id}
                        className="text-blue-600 border-blue-600 peer"
                      />
                      <div className="flex items-end flex-1 justify-between">
                        <div className="flex items-center gap-3 ">
                          <div className="size-8 rounded-full bg-[#EBEBF0] flex items-center justify-center">
                            <Icon
                              icon="tabler:map-pin-filled"
                              className="size-6 text-primary stroke-[1.5] stroke-white"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium">
                              {item.first_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.address_1}, {item.city}
                            </p>
                          </div>
                        </div>
                        {item.is_default_shipping && (
                          <div className="flex items-center justify-center rounded px-1 py-0.5 text-xs font-medium bg-red-100 text-red-500">
                            Mặc định
                          </div>
                        )}
                      </div>
                    </Label>
                  ))}
                  {/* <Label
              htmlFor="current"
              className="rounded-lg border [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600  p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative"
            >
              {location === "current" && (
                <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
                  <Icon icon="ph:check" className="size-2.5" />
                </div>
              )}
              <RadioGroupItem
                value="current"
                id="current"
                className="text-blue-600 border-blue-600 peer"
              />
              <div className="flex items-center gap-3 ">
                <div className="size-8 rounded-full bg-[#EBEBF0] flex items-center justify-center">
                  <Icon icon="ph:gps-fix" className="size-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Vị trí hiện tại</p>
                  <p className="text-sm text-muted-foreground">
                    126, Nguyễn Văn Cừ, Phường An Khánh, Q. Ninh Kiều, Cần Thơ
                  </p>
                </div>
              </div>
            </Label> */}
                </div>
              </RadioGroup>
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col gap-4 items-center justify-center">
                <Image
                  src={notFound.src}
                  alt="not-record"
                  className="w-[200px] h-full"
                />
                <p className="max-w-[300px] text-sm font-medium text-center">
                  Vui lòng đăng nhập để thêm địa chỉ
                </p>
              </div>
            </div>
          </>
        )}

        <div className="px-4 py-2">
          {user && (
            <Button
              variant="secondary"
              className="py-2 px-3"
              onClick={() => setOpen(true)}
            >
              <Plus />
              Thêm địa chỉ khác
            </Button>
          )}
        </div>
      </div>
      <div className="border-t border-t-gray-100">
        <div className="flex items-center justify-center gap-2">
          {user ? (
            <Button
              className="h-10 w-fit px-7"
              disabled={
                location === defaultAddress?.id ||
                isLoadingApply ||
                !user ||
                !listAddress ||
                listAddress.length <= 0
              }
              onClick={handleApply}
            >
              {isLoadingApply ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Đang xử lý
                </>
              ) : (
                "Áp dụng"
              )}
            </Button>
          ) : (
            <Button asChild className="h-10 w-fit px-7">
              <Link href="/auth">Đăng nhập</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressList;
