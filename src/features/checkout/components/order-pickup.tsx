import { Location, vector } from "@/assets/icons";
import AddNewItem from "@/components/base-components/cta/add-new-item";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import { Combobox } from "@/components/base-components/input/combobox";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { getBranchReceiveOrder } from "@/services/orders";
import { useEffect, useState } from "react";

const OrderPickup = ({
  setBranchPickup,
  branchPickup,
}: {
  setBranchPickup: (value: any) => void;
  branchPickup: any;
}) => {
  const [store, setStore] = useState("");
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await getBranchReceiveOrder();
      setBranches(response.data);
    };
    fetchStores();
  }, []);

  const handleApply = () => {
    const branch = branches?.find((item: any) => item.id === store);
    setBranchPickup(branch);
    setOpen(false);
  };

  return (
    <div className="w-full py-4 flex flex-col gap-2">
      <div className="px-4">
        <div className="h-14 w-full flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Location.src} className="w-5 h-5" alt="" />
            <span className="font-semibold">Cửa hàng gần bạn</span>
          </div>
          {branchPickup && (
            <Button
              variant="ghost"
              className="text-sm text-blue-600 hover:bg-blue-50"
              onClick={() => setOpen(true)}
            >
              Thay đổi
            </Button>
          )}
        </div>
      </div>
      <div className="px-4">
        {branchPickup && (
          <div className="p-4 rounded-lg ring-1 ring-blue-500 flex items-start justify-between relative">
            {branchPickup && (
              <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
                <IconCustom icon="ph:check" className="size-2.5" />
              </div>
            )}
            <div className="absolute bottom-0 right-0">
              <img src={vector.src} alt="pattern" className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{branchPickup.name}</p>
              <div
                className="text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: branchPickup.description,
                }}
              />
            </div>
            <Button variant="secondary" className="text-sm">
              Xem chỉ đường
            </Button>
          </div>
        )}
      </div>

      <div className={cn("px-4", branchPickup && "hidden")}>
        <DialogResponsive
          open={open}
          setOpen={setOpen}
          trigger={<AddNewItem className="h-[160px]">Chọn cửa hàng</AddNewItem>}
        >
          <div className="flex flex-col flex-1 h-full">
            <div className="flex flex-col flex-1 flex-grow gap-4 overflow-y-auto p-4">
              <DialogHeader className="h-fit">
                <DialogTitle className="text-center">Chọn cửa hàng</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Combobox
                  items={[
                    {
                      label: "Cần Thơ",
                      value: "can_tho",
                    },
                    {
                      label: "Hồ Chí Minh",
                      value: "ho_chi_minh",
                    },
                  ]}
                  label="Tỉnh/Thành phố"
                />
                {!branches || branches.length === 0 ? (
                  <div className="flex items-center justify-center h-full min-h-40">
                    <p className="text-sm text-muted-foreground">
                      Không tìm thấy cửa hàng nào
                    </p>
                  </div>
                ) : (
                  <>
                    <RadioGroup
                      className="w-full"
                      value={store}
                      onValueChange={(value) => setStore(value)}
                    >
                      <div className="grid grid-cols-1 gap-2">
                        {branches?.map((item: any, key: number) => (
                          <Label
                            key={key}
                            htmlFor={item.id}
                            className="rounded-lg border [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600  p-4 flex items-start gap-4 cursor-pointer hover:bg-gray-100 relative"
                          >
                            {store === item.id && (
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
                                <div className="flex flex-col gap-1">
                                  <p className="text-sm font-medium">
                                    {item.name}
                                  </p>
                                  {/* <p className="text-sm text-muted-foreground">
                                {item?.phone}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item?.address}
                              </p> */}
                                  <div
                                    className="text-sm text-muted-foreground"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  />
                                </div>
                              </div>
                              <Button variant="secondary" className="text-sm">
                                Xem chỉ đường
                              </Button>
                            </div>
                          </Label>
                        ))}
                      </div>
                    </RadioGroup>
                  </>
                )}
              </div>
            </div>
            <div className="h-[64px] flex items-center justify-center border-t border-t-gray-200">
              <Button disabled={!store} onClick={handleApply}>
                Áp dụng
              </Button>
            </div>
          </div>
        </DialogResponsive>
      </div>
    </div>
  );
};

export default OrderPickup;
