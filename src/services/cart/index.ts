import { axios_instance, DeleteData, PostData } from "@/apis";
import { GetACookie } from "@/utilities/cookies";
import { getGlobalKey } from "../globals";
import { GlobalKeys } from "../globals";

export const createCart = async (email: string) => {
  return (
    await axios_instance.post(`/store/carts`, {
      email: email,
      sales_channel_id: getGlobalKey(GlobalKeys.SALE_CHANNEL_ID),
      region_id: getGlobalKey(GlobalKeys.REGION_ID),
    })
  ).data;
};

export const createCartApi = async (email: string) => {
  return axios_instance.post(`/store/carts`, {
    email: email,
    sales_channel_id: getGlobalKey(GlobalKeys.SALE_CHANNEL_ID),
    region_id: getGlobalKey(GlobalKeys.REGION_ID),
  });
};

export const setCustomer = async (cartId: string) => {
  return (await axios_instance.post(`/store/carts/${cartId}/customer`, {}))
    .data;
};

export const getCartData = async (): Promise<any> => {
  const cartId = localStorage.getItem("cart_id");
  if (cartId) {
    return (await axios_instance.get(`/store/carts/${cartId}`)).data;
  }
  throw {
    code: 401,
    message: "Cart ID is missing",
  };
};

export const checkAvailableStock = async (
  variantId: string,
  quantity: number
) => {
  return (
    await axios_instance.post(`/store/stock/is-available`, {
      variantId: variantId,
      neededQuantity: quantity,
    })
  ).data;
};

export const addProductToCart = async (
  variantId: string,
  quantity: number,
  metadata: any
) => {
  const cartId = localStorage.getItem("cart_id");
  const token = GetACookie("token");

  try {
    if (token) {
      if (cartId) {
        return (
          await axios_instance.post(`/store/carts/${cartId}/items`, {
            variant_id: variantId,
            quantity: quantity,
            metadata: metadata,
          })
        ).data;
      } else {
        throw { code: 400, message: "Cart ID is missing" };
      }
    } else {
      throw {
        code: 401,
        message: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const updateCartItem = async (
  cartId: string,
  lineItemId: string,
  quantity: number,
  metadata?: any
) => {
  return (
    await axios_instance.patch(`/store/carts/${cartId}/items/${lineItemId}`, {
      quantity: quantity,
      metadata: metadata,
    })
  ).data;
};

export const removeCartItem = async (cartId: string, lineItemId: string) => {
  return (
    await axios_instance.delete(`/store/carts/${cartId}/items/${lineItemId}`)
  ).data;
};

export const applyPromotion = async (cartId: string, promoCodes: string[]) => {
  return (
    await axios_instance.post(`/store/carts/${cartId}/promotions`, {
      promo_codes: promoCodes,
    })
  ).data;
};

export const removePromotion = async (cartId: string) => {
  const response = await DeleteData(
    `${process.env.NEXT_PUBLIC_API_URL}/store/carts/${cartId}/promotions`,
    {}
  );

  if (response) {
    return response;
  }
};

export const createPaymentCollection = async (cartId: string) => {
  return (
    await axios_instance.post(`/store/payment-collections`, {
      cart_id: cartId,
    })
  ).data;
};

export const initializePaymentSession = async (paymentCollectionId: string) => {
  return (
    await axios_instance.post(
      `/store/payment-collections/${paymentCollectionId}/payment-sessions`,
      {
        provider_id: getGlobalKey(GlobalKeys.PROVIDER_PAYMENT_ID),
      }
    )
  ).data;
};

export const completeCart = async (cartId: string) => {
  return (await axios_instance.post(`/store/carts/${cartId}/complete`, {}))
    .data;
};
