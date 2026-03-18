"use client";
import BackTo from "@/components/particals/back-to";
import { ENUM } from "@/configs";
import { getOrdersDetailData, getShipmentData } from "@/services/orders";
import { setOrderDetailData } from "@/stores/datas/orders-data-slice";
import { base64UrlDecode, DecryptBasic } from "@/utilities/hash-aes";
import { translate } from "@/utilities/translator";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import OrderPaymentMethod from "./components/order-payment-method";
import OrderSupport from "./components/order-support";
import OrderProductsList from "./components/products-list";
import ShippingInfo from "./components/shipping-info";

const OrderManagementFeatures = ({orderId}: {orderId: string}) => {
  const dispatch = useDispatch();
  const [shipment, setShipment] = useState<any>(null);
  //   const [isCancelOrder, setIsCancelOrder] = useState(true);

  useEffect(() => {
    if (orderId) {
      const orderID = base64UrlDecode(orderId);

      const id = DecryptBasic(orderID, ENUM.SECRET_AES_TOKEN_HASH);
      const fetchData = async () => {
        const res = await getOrdersDetailData(id);

        if (res) {
          dispatch(setOrderDetailData(res));
          const shipment = await getShipmentData(id);
          setShipment(shipment);
          //   const isCancel =
          //     res.order.payment_collections[0].captured_amount &&
          //     res.order.payment_collections[0].captured_amount > 0;
          //   setIsCancelOrder(isCancel);
          return;
        }
      };
      fetchData();
    }
  }, [orderId]);

  //   if (isCancelOrder) {
  //     return (
  //       <>
  //         <div className="h-[72px] w-full bg-white gap-2 rounded-t-lg overflow-hidden flex items-center justify-start px-4">
  //           <Link href="/profile/order-management">
  //             <Button className="text-sm pl-2 pr-4 font-semibold bg-gray-border hover:!bg-gray-border text-txtprimary">
  //               <Icon icon="ph:caret-left" fontSize={24} /> Trở lại
  //             </Button>
  //           </Link>
  //           <span className="font-semibold text-lg">Hủy đơn hàng</span>
  //         </div>
  //         {/* Body */}
  //         <CancelOrderFeature />
  //       </>
  //     );
  //   }

  return (
    <>
      <div className="hidden desktop:inline-block">
        <BackTo url="/profile/order-management">
          {translate("order_detail")}
        </BackTo>
      </div>

      <div className="flex flex-col w-full gap-3">
        <ShippingInfo shipment={shipment} />
        <OrderProductsList />
        <div className="flex gap-3 flex-col desktop:flex-row ">
          <OrderPaymentMethod />
          <OrderSupport />
        </div>
      </div>
    </>
  );
};

export default OrderManagementFeatures;
