import React from "react";
import {CtaWithIcon} from "../elements";
import {Icon} from "@/components/common-components";

const OrderSupport = () => {
  return (
    <div className="min-w-[359px] w-full desktop:w-fit p-4 bg-white rounded-lg overflow-hidden">
      <span className="font-semibold">Hỗ trơ</span>
      <div className="flex flex-col w-full">
        <CtaWithIcon
          icon={
            <Icon
              icon="ph:chat-circle-dots"
              fontSize={20}
              className="text-4xl text-gray-600 p-2"
            />
          }
          title="Liên hệ shop"
          description="Liên hệ với người bán để được hổ trợ về đơn hàng"
        />
        <hr className="h-[1px] w-full bg-gray-border" />
        <CtaWithIcon
          icon={
            <Icon
              icon="ph:headphones"
              fontSize={20}
              className="text-4xl text-gray-600 p-2"
            />
          }
          title="Trung tâm hổ trợ CSKH"
          description="Giải đáp các thắc mắc về đơn hàng của bạn "
        />
      </div>
    </div>
  );
};

export default OrderSupport;
