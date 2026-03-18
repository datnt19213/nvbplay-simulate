import TextInput from "@/components/base-components/input/text-input";
import {Switch} from "@/components/ui/switch";
import {Info} from "lucide-react";
import React from "react";

const ElectricInvoice = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex items-center justify-between p-4">
        <span className="flex items-center gap-2 text-lg font-semibold">
          Xuất hoá đơn điện tử <Info className="text-gray-icon" size={20} />{" "}
        </span>
        <Switch className="data-[state=checked]:bg-blue-hovered" />
      </div>
      <div className="grid grid-cols-1 desktop:grid-cols-2 p-4 gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-gray-icon font-medium text-sm">
            Tên doanh nghiệp
          </span>
          <TextInput
            placeholder="Nhập tên doanh nghiệp"
            className="bg-gray-primary !border-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-icon font-medium text-sm">Mã số thuế</span>
          <TextInput
            placeholder="Nhập mã số thuế"
            className="bg-gray-primary !border-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-icon font-medium text-sm">
            Email nhận hoá đơn
          </span>
          <TextInput
            placeholder="Nhập email"
            className="bg-gray-primary !border-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-icon font-medium text-sm">
            Địa chỉ trên hoá đơn
          </span>
          <TextInput
            placeholder="Nhập địa chỉ"
            className="bg-gray-primary !border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ElectricInvoice;
