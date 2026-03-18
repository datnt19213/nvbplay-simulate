import { axios_instance, GetData, PostData } from "@/apis";
import { ENUM } from "@/configs";
import { GetACookie } from "@/utilities/cookies";
import { DecryptBasic } from "@/utilities/hash-aes";
import { redirect, RedirectType } from "next/navigation";

/*
    Lấy danh sách đơn hàng
*/
export const getOrdersData = async () => {
  const token = GetACookie("token");
  if (token) {
    const response = (await GetData(
      "/store/orders?order=-created_at",
      {},
      {
        Authorization: `Bearer ${DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)}`,
        "ngrok-skip-browser-warning": "true",
      }
    )) as any;
    if (response?.data?.orders?.length > 0) {
      return response.data.orders;
    }
  } else {
    redirect("/auth", RedirectType.push);
  }
  return null;
};

/*
    Lấy chi tiết đơn hàng
*/
export const getOrdersDetailData = async (id: string) => {
  const token = GetACookie("token");
  if (token) {
    const response = (await GetData(
      `/store/orders/${id}?fields=+metadata`,
      {},
      {
        Authorization: `Bearer ${DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)}`,
        "ngrok-skip-browser-warning": "true",
      }
    )) as any;
    if (response) {
      return response.data.order;
    }
  } else {
    redirect("/auth", RedirectType.push);
  }
  return null;
};

export const getOrderData = async (orderID: string) => {
  const response = (await GetData(
    `/store/orders/${orderID}?fields=+metadata`,
    {},
    {
      "ngrok-skip-browser-warning": "true",
    }
  )) as any;
  return response.data.order;
};

/*
    Lấy các phương thức nhận hàng (shipping, pickup)
*/
export const getReceiveOrderType = async () => {
  const response = (await GetData(
    `/store/location/fullimentset`,
    {},
    {
      "ngrok-skip-browser-warning": "true",
    }
  )) as any;
  if (response && response.data) {
    return response.data;
  }
};

/*
    Lấy các chi nhánh nhận hàng (trường hợp lấy tại chỗ)
*/
export const getBranchReceiveOrder = async () => {
  const response = (await GetData(
    `/store/location/channels`,
    {},
    {
      "ngrok-skip-browser-warning": "true",
    }
  )) as any;
  if (response && response.data) {
    return response.data;
  }
};

/*
    Tạo link thanh toán
*/
export const createPaymentLink = async (orderID: string, data: any) => {
  const response = (await PostData(
    `/payment/create-link/mds/${orderID}`,
    data,
    {
      "ngrok-skip-browser-warning": "true",
    }
  )) as any;
  if (response?.result === "success") {
    return response;
  }
  return null;
};

export const getShipmentData = async (orderID: string) => {
  return (await axios_instance.get(`/store/orders/${orderID}/shipment`)).data;
};

export const addNoteOrder = async (orderID: string, data: any) => {
  return (await axios_instance.post(`/store/orders/${orderID}/add-note`, data))
    .data;
};

/*
    Hủy đơn hàng        
*/
export const cancelOrder = async (orderID: string) => {
  const token = GetACookie("token");
  if (token) {
    return (
      await axios_instance.post(`/store/orders/${orderID}/transfer/cancel`, {})
    ).data;
  }

  return null;
};
