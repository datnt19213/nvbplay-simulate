import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CallToAction from "./components/call-to-action";
import HotVoucherTab from "./components/hot-voucher-tab";
import SavedVoucherTab from "./components/saved-voucher-tab";
import TabsUI, { Tab } from "./components/tabs-ui";

const VoucherWallet = () => {
  const tabData: Tab[] = [
    {
      id: "voucher-hot",
      label: "Voucher Hot",
      content: <HotVoucherTab />,
    },
    { id: "saved", label: "Đã lưu", content: <SavedVoucherTab /> },
  ];
  return (
    <div className="w-full text-14-21-500">
      <div className="bg-white rounded-t-[8px] pt-[16px] w-full pb-[24px]">
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-0 justify-between items-center w-full px-[20px]">
          <h3 className="text-18-27-600">Ví voucher </h3>
          <form action="" className="flex gap-2">
            <Input className="w-[302px]" placeholder="Nhập mã giảm giá" />
            <Button>Áp dụng</Button>
          </form>
        </div>
      </div>
      <div>
        <TabsUI tabs={tabData} />
      </div>
      <div className="px-[16px] md:px-0">
        <CallToAction />
      </div>
    </div>
  );
};

export default VoucherWallet;
