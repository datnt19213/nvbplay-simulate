import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";

import AddressForm from "./address-form";
import AddressList from "./address-list";
import { getUserAddressData } from "@/services/addresses";
import { useDispatch, useSelector } from "react-redux";
import { setListAddress, setUserAddressData } from "@/stores/datas/addresses-data-slice";
import { RootState } from "@/stores";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCardPlus } from "@/assets/icons";
import IconCustom from "@/components/common-components/icon-custom";
interface AddressProps {
  open: boolean;
  setOpenRoot: (open: boolean) => void;
  activeForm?: boolean;
}
export const Address = ({
  open,
  setOpenRoot,
  activeForm = false,
}: AddressProps) => {
  const dispatch = useDispatch();
  const [formAdd, setFormAdd] = React.useState(activeForm);
  const [isLoading, setIsLoading] = React.useState(false);
  const defaultAddress = useSelector(
    (state: RootState) => state.users_address_data.userAddress
  );
  React.useEffect(() => {
    if (!formAdd) {
      const fetchAddress = async () => {
        setIsLoading(true);
        const address = await getUserAddressData();
        dispatch(setListAddress(address));
        setIsLoading(false);
      };
      fetchAddress();
    }
  }, [formAdd]);

  return (
    <>
      <div className="h-full w-full p-4">
        <DialogHeader className=" mb-4 ">
          <DialogTitle className="text-center">Địa chỉ giao hàng</DialogTitle>
        </DialogHeader>

        <div
          className={cn(
            "absolute inset-0 w-full h-full z-50 overflow-y-auto transition-transform duration-300 ease-in-out -translate-x-full bg-white dark:bg-gray-800",
            formAdd ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col flex-1 h-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-b-gray-100">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFormAdd(false)}
              >
                <IconCustom icon="tabler:chevron-left" className="size-4" />
              </Button>
              <h2 className="text-lg font-semibold">Thêm thẻ mới</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenRoot(false)}
              >
                <IconCustom icon="tabler:x" className="size-4" />
              </Button>
            </div>
            <div className="p-4 pb-0 flex flex-1 flex-col gap-5  overflow-y-auto scrollbar-none">
              <AddressForm setOpen={setFormAdd} isOpen={formAdd} />
            </div>
          </div>
        </div>
        <div className="border-b border-b-gray-100" />
        <AddressList
          defaultAddress={defaultAddress}
          setOpen={setFormAdd}
          setOpenRoot={setOpenRoot}
          isLoading={isLoading}
          isOpen={formAdd}
        />
      </div>
    </>
  );
};
