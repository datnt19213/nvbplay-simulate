import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getUserAddressData } from "@/services/addresses";
import { RootState } from "@/stores";
import { setUserAddressData } from "@/stores/datas/addresses-data-slice";
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddressTrigger = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const dispatch = useDispatch();
  const address = useSelector(
    (state: RootState) => state.users_address_data.userAddress
  );

  useEffect(() => {
    const fecthAddressData = async () => {
      const address = await getUserAddressData();
      if (address && address.length > 0) {
        const defaultAddress = address.find(
          (item: any) => item.is_default_shipping
        );
        dispatch(setUserAddressData(defaultAddress));
      }
    };
    fecthAddressData();
  }, []);

  if (isDesktop) {
    return (
      <div className="flex flex-col gap-0.5 cursor-pointer max-w-[150px]">
        <p className="text-xs text-muted-foreground">Giao đến</p>
        <div className="flex items-center gap-1.5">
          <Icon icon="tabler:map-pin" className="size-5" />
          <p className="text-sm line-clamp-1">
            {address?.address_1 || "Khách"}
          </p>
        </div>
      </div>
    );
  }
  return (
    <Button variant="ghost" size="icon">
      <Icon icon="tabler:map-pin" className="size-6 flex lg:hidden" />
    </Button>
  );
};

export default AddressTrigger;
