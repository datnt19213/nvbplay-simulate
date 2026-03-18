import { Icon } from "@/components/common-components";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import React from "react";

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  discount?: {
    text: string;
    icon: string;
  };
  balance?: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "cod",
    name: "COD",
    description: "Thanh toán khi nhận hàng",
    icon: "/images/subcription/cod.png",
  },
  {
    id: "nvb-wallet",
    name: "Ví NVB",
    description: "Thanh toán bằng ví NVB Play",
    icon: "/icons/nvbplay_logo.svg",
    balance: "1.250.000 đ",
    discount: {
      text: "Giảm đến 50%, tối đa 50K cho đơn từ 100K",
      icon: "/images/subcription/discount-icon.png",
    },
  },
  {
    id: "qr-vnpay",
    name: "QR VNPAY",
    description: "Thanh toán bằng QR VNPAY",
    icon: "/images/subcription/vnpay.png",
  },
  {
    id: "momo",
    name: "Ví Momo",
    description: "Thanh toán bằng ví điện tử Momo",
    icon: "/images/subcription/momo.png",
  },
];

export const PaymentMethod = () => {
  return (
    <RadioGroup className="w-full">
      {paymentMethods.map((method) => (
        <div key={method.id} className="grid grid-cols-1 gap-2">
          <PaymentMethodItem method={method} />
        </div>
      ))}
    </RadioGroup>
  );
};

const PaymentMethodItem = ({ method }: { method: PaymentMethod }) => {
  return (
    <Label
      htmlFor={method.id}
      className="rounded-lg border [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 relative"
    >
      {/* Checked Icon */}
      <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
        <Icon icon="ph:check" className="size-2.5" />
      </div>

      {/* Discount Badge */}
      {method.discount && (
        <div className="absolute -top-2 left-8">
          <div className="bg-gradient-to-r from-[#FF3F1A] to-[#DD842B] rounded-lg py-1 px-2 flex items-center gap-1">
            <Image
              src={method.discount.icon}
              alt="discount"
              width={15}
              height={15}
            />
            <span className="text-xs text-white">{method.discount.text}</span>
          </div>
        </div>
      )}

      <RadioGroupItem
        value={method.id}
        id={method.id}
        className="text-blue-600 border-blue-600 peer"
      />
      <div className="flex items-center flex-1 justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={method.icon}
            alt={method.name.toLowerCase()}
            width={40}
            height={40}
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">
              {method.name}
              {method.balance && (
                <span className="text-xs text-[#0B74E5]">
                  {" "}
                  (Số dư: {method.balance})
                </span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              {method.description}
            </p>
          </div>
        </div>
      </div>
    </Label>
  );
};