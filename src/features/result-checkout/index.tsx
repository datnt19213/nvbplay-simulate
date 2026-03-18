"use client";

import Bounded from "@/components/base-components/containers/bounded";
import { ENUM } from "@/configs";
import { getOrdersDetailData } from "@/services/orders";
import { base64UrlDecode, DecryptBasic } from "@/utilities/hash-aes";
import { useEffect, useState } from "react";
import BackgroundResult from "./components/bg-result";
import DetailOrder from "./components/detail-order";
import DetailPayment from "./components/detail-payment";
import DetailProducts from "./components/detail-products";
import DetailShipping from "./components/detail-shipping";

const ResultCheckoutFeature = ({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      const orderID = base64UrlDecode(orderId);
      const id = DecryptBasic(orderID, ENUM.SECRET_AES_TOKEN_HASH);
      const order = await getOrdersDetailData(id);
      if (order) {
        setOrder(order);
      }
      setIsLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  return (
    <Bounded className="py-8 flex flex-col gap-4">
      <div className="">
        <BackgroundResult
          type={status as "success" | "error" | "pending"}
          receiveType={order?.metadata?.order_method}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="">
          <div className="flex lg:w-[824px] w-full flex-1 gap-4 flex-col">
            <DetailProducts order={order} isLoading={isLoading} />
            <DetailShipping order={order} />
            {order?.metadata?.order_method === "shipping" && (
              <>
                <DetailPayment />
              </>
            )}
          </div>
        </div>
        <div className="lg:w-[360px] w-full">
          <DetailOrder order={order} orderId={orderId} isLoading={isLoading} />
        </div>
      </div>
    </Bounded>
  );
};

export default ResultCheckoutFeature;
