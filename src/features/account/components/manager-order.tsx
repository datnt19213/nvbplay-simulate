import { Icon } from "@iconify/react";

const ManagerOrder = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between items-center">
        <h6 className="text-sm font-semibold">Quản lý đơn hàng</h6>
        <p className="text-sm text-primary cursor-pointer font-medium">
          Xem tất cả
        </p>
      </div>
      <div className="py-4 flex items-center justify-around w-full gap-2">
        <div className="w-[59px] flex flex-col items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer">
          <div className="size-12 rounded-full bg-[#F5F5FA] flex items-center justify-center">
            <Icon icon="ph:notepad" className="size-6" />
          </div>
          <p className="text-xs">Đang xử lý</p>
        </div>
        <div className="w-[59px] flex flex-col items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer">
          <div className="size-12 rounded-full bg-[#F5F5FA] flex items-center justify-center relative">
            <Icon icon="hugeicons:delivery-truck-02" className="size-6" />
            <p className="p-2 size-[18px] rounded-full text-white bg-red-500 absolute -top-0.5 -right-0.5 flex items-center justify-center text-[10px]">
              2
            </p>
          </div>
          <p className="text-xs">Đang giao</p>
        </div>
        <div className="w-[59px] flex flex-col items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer">
          <div className="size-12 rounded-full bg-[#F5F5FA] flex items-center justify-center relative">
            <Icon icon="ph:calendar-check" className="size-6" />
            <p className="p-2 size-[18px] rounded-full text-white bg-red-500 absolute -top-0.5 -right-0.5 flex items-center justify-center text-[10px]">
              1
            </p>
          </div>
          <p className="text-xs">Đã giao</p>
        </div>
        <div className="w-[59px] flex flex-col items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer">
          <div className="size-12 rounded-full bg-[#F5F5FA] flex items-center justify-center">
            <Icon icon="ph:git-diff" className="size-6" />
          </div>
          <p className="text-xs">Trả hàng</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerOrder;
