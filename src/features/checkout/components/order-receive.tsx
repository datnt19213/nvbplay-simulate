import { ButtonCheck } from "@/components/base-components/buttons";
import { Info } from "lucide-react";
import React from "react";

const OrderReceive = ({
  setReceive,
  receive,
}: {
  setReceive: (value: "shipping" | "pickup") => void;
  receive: "shipping" | "pickup";
}) => {
  return (
    <div className="flex desktop:items-center justify-between border-b border-dashed min-h-[71px] p-4 flex-col desktop:flex-row">
      <span className="flex items-center gap-2 text-lg font-semibold">
        Hình thức nhận hàng <Info className="text-gray-icon" size={20} />{" "}
      </span>
      <div className="flex items-center gap-2">
        <ButtonCheck
          title={"Giao hàng tận nơi"}
          name={"shipping"}
          id={"shipping"}
          isChecked={receive === "shipping"}
          onChange={() => setReceive("shipping")}
        />
        <ButtonCheck
          title={"Nhận tại cửa hàng"}
          name={"pickup"}
          id={"pickup"}
          isChecked={receive === "pickup"}
          onChange={() => setReceive("pickup")}
        />
      </div>
    </div>
  );
};

export default OrderReceive;
