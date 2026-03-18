import Image from "@/components/base-components/images/image";
import RadioCard from "@/components/base-components/radios";
import { COMMON_DATA } from "@/configs";
import { RootState } from "@/stores";
import { setPaymentSelected } from "@/stores/checkout";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentMethod = ({
  order,
  paymentGateway,
  setPaymentGateway,
}: {
  order: any;
  paymentGateway: any;
  setPaymentGateway: any;
}) => {
  const { paymentSelected } = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-col">
      <div className="p-4 w-full">
        <span className="flex items-center gap-2 text-lg font-semibold">
          Cổng thanh toán
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        {COMMON_DATA.payment_method.map((payment, index) => (
          <RadioCard
            key={index}
            id={payment.name}
            name="payment-method"
            className="!items-center"
            isChecked={payment.id.toString() === paymentGateway}
            onChange={() => setPaymentGateway(payment.id.toString())}
          >
            <PaymentItem
              description={payment.description}
              icon={payment.icon}
              name={payment.name}
            />
          </RadioCard>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;

type PaymentItemProps = {
  name: string;
  icon: string;
  description: string;
};

const PaymentItem: FC<PaymentItemProps> = ({ description, icon, name }) => {
  return (
    <div className="flex gap-3">
      {icon && (
        <Image
          src={icon}
          className="rounded-lg bg-white flex items-center justify-center overflow-hidden"
          classNameImage="h-[32px] w-[32px] aspect-square object-contain"
        />
      )}
      <div className="flex flex-col">
        <span className="text-sm text-txtprimary font-semibold">{name}</span>
        <span className="text-sm text-txtsecondary font-medium">
          {description}
        </span>
      </div>
    </div>
  );
};
