"use client";
import { ENUM } from "@/configs";
import ConsultantCode from "@/features/checkout/components/consultant-code";
import Discount from "@/features/checkout/components/discount";
import ElectricInvoice from "@/features/checkout/components/electric-invoice";
import OrderAddress from "@/features/checkout/components/order-address";
import OrderInfo from "@/features/checkout/components/order-info";
import OrderReceive from "@/features/checkout/components/order-receive";
import PaymentMethod from "@/features/checkout/components/payment-method";
import ProductsList from "@/features/checkout/components/products-list";
import { getUserAddressData } from "@/services/addresses";
import { getOrderData, getOrdersData } from "@/services/orders";
import { RootState } from "@/stores";
import { base64UrlDecode, DecryptBasic } from "@/utilities/hash-aes";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Shipping from "./components/shipping";
import OrderPickup from "./components/order-pickup";
import CreditCards from "./components/credit-cards";
import CryptoSelection from "./components/crypto";
import Installment from "./components/installment";
import { setOrderData } from "@/stores/datas/order-slice";
import {
  setListAddress,
  setUserAddressData,
} from "@/stores/datas/addresses-data-slice";
import { Pattern } from "@/assets/icons";

const CheckoutFeature = () => {
  const searchParams = useSearchParams();
  const { listAddress, userAddress } = useSelector(
    (state: RootState) => state.users_address_data
  );
  const orderUser = useSelector((state: RootState) => state.order_slice.order);
  const dispatch = useDispatch();

  const [order, setOrder] = useState<any>();
  const [shipping, setShipping] = useState<any>({ id: "" });
  const [paymentGateway, setPaymentGateway] = useState<any>("stripe");
  const [receive, setReceive] = useState<"shipping" | "pickup">("shipping");
  const [branchPickup, setBranchPickup] = useState<any>();
  const [activeAddress, setActiveAddress] = useState<any>();
  useEffect(() => {
    const fetchAddress = async () => {
      const response = await getUserAddressData();
      if (response) {
        dispatch(setListAddress(response));
        const addressDefault = response.find(
          (item: any) => item.is_default_shipping
        );
        if (addressDefault) {
          dispatch(setUserAddressData(addressDefault));
          setActiveAddress(addressDefault);
        }
      }
    };
    fetchAddress();
  }, []);

  useEffect(() => {
    if (userAddress) {
      setActiveAddress(userAddress);
    }
  }, [userAddress]);

  useEffect(() => {
    if (orderUser) {
      setOrder(orderUser);
    } else {
      const fetchOrder = async () => {
        const encodedOrderID = await searchParams.get("order_id");

        if (encodedOrderID) {
          const orderID = base64UrlDecode(encodedOrderID);

          const id = DecryptBasic(orderID, ENUM.SECRET_AES_TOKEN_HASH);

          const response = await getOrderData(id);

          if (response) {
            setOrder(response);
            dispatch(setOrderData(response));
          }
        }
      };
      fetchOrder();
    }
  }, [searchParams]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative w-full max-w-[1200px] flex flex-col desktop:flex-row gap-3 mx-auto rounded-lg overflow-hidden mt-6 py-6">
        <div className="relative flex flex-col w-full rounded-lg gap-3">
          <div className="rounded-lg overflow-hidden bg-white w-full relative">
            <div className="absolute top-0 inset-x-0 h-1 w-full z-10 bg-cover bg-center">
              <img src={Pattern.src} alt="pattern" className="w-full h-full" />
            </div>
            <OrderReceive setReceive={setReceive} receive={receive} />
            {receive === "shipping" && (
              <OrderAddress
                address={listAddress}
                userAddress={userAddress}
                activeAddress={activeAddress}
                setActiveAddress={setActiveAddress}
              />
            )}
            {receive === "pickup" && (
              <OrderPickup
                setBranchPickup={setBranchPickup}
                branchPickup={branchPickup}
              />
            )}
          </div>
          <div className="rounded-lg overflow-hidden bg-white w-full">
            <ProductsList />
          </div>

          {receive === "shipping" && (
            <div className="rounded-lg overflow-hidden bg-white w-full">
              <Shipping
                setShipping={setShipping}
                shipping={shipping}
                order={order}
                activeAddress={activeAddress}
              />
            </div>
          )}

          {receive === "shipping" && (
            <div className="rounded-lg overflow-hidden bg-white w-full">
              <PaymentMethod
                order={order}
                paymentGateway={paymentGateway}
                setPaymentGateway={setPaymentGateway}
              />
            </div>
          )}
        </div>
        <div className="sticky top-[20rem] min-w-[360px] rounded-lg flex flex-col gap-3">
          {/* <div className="rounded-lg overflow-hidden bg-white w-full">
          <Discount />
        </div> */}
          <div className="rounded-lg overflow-hidden bg-white w-full">
            <ConsultantCode />
          </div>
          <div className="rounded-lg overflow-hidden bg-white w-full">
            <OrderInfo
              paymentGateway={paymentGateway}
              order={order}
              shipping={shipping}
              address={activeAddress || userAddress}
              receive={receive}
              branchPickup={branchPickup}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CheckoutFeature;
