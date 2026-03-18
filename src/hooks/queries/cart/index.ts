import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { ICartResponse } from "./type";
import {
  addProductToCart,
  applyPromotion,
  checkAvailableStock,
  completeCart,
  createCartApi,
  createPaymentCollection,
  getCartData,
  initializePaymentSession,
  removeCartItem,
  removePromotion,
  setCustomer,
  updateCartItem,
} from "@/services/cart";
import { toastNVB } from "@/components/base-components/toast";
import { useRouter } from "next/navigation";

export const useCarts = () => {
  const router = useRouter();
  /*
  TODO:     
  1. GET CART DATA
  2. CREATE CART
  3. SET CUSTOMER FOR CART
  4. ADD PRODUCT TO CART
  5. CHECK AVAILABLE STOCK
  6. REMOVE PRODUCT FROM CART
  7. UPDATE PRODUCT QUANTITY IN CART
  8. APPLY PROMOTION
  9. REMOVE PROMOTION
  10. CREATE PAYMENT COLLECTION
  11. INITIALIZE PAYMENT SESSION
  12. COMPLETE CART
  */

  //_____________________________________________________

  // GET CART DATA
  const { data, isLoading, isError, ...rest } = useQuery<{
    cart: ICartResponse;
  }>({
    queryKey: ["cart"],
    queryFn: () => getCartData(),
    placeholderData: keepPreviousData,
  });

  // CREATE CART
  const createCartMutation = useMutation({
    mutationFn: (email: string) => createCartApi(email),
    onSuccess: async (res) => {
      toastNVB({
        type: "success",
        msg: "Tạo giỏ hàng thành công",
      });
      return res;
    },
    onError: (err: Error) => {
      toastNVB({
        type: "error",
        msg: "Tạo giỏ hàng thất bại",
      });
      return err;
    },
  });

  // SET CUSTOMER FOR CART
  const setCustomerMutation = useMutation({
    mutationFn: (cartId: string) => setCustomer(cartId),
    onSuccess: async (res) => {
      console.log(res);
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });

  // ADD PRODUCT TO CART
  const addProductMutation = useMutation({
    mutationFn: (args: {
      variant_id: string;
      quantity: number;
      metadata: any;
    }) => addProductToCart(args.variant_id, args.quantity, args.metadata),
    onSuccess: async (res) => {
      return res;
    },
    onError: (err: any) => {
      if (err.code === 401) {
        toastNVB({
          type: "info",
          msg: err.message,
        });
        router.push("/auth");
      } else if (err.code === 400) {
        toastNVB({
          type: "error",
          msg: err.message,
        });
      } else {
        toastNVB({
          type: "error",
          msg: "Thêm sản phẩm thất bại",
        });
      }

      return err;
    },
  });

  // CHECK AVAILABLE STOCK
  const checkAvailableStockMutation = useMutation({
    mutationFn: (args: { variant_id: string; quantity: number }) =>
      checkAvailableStock(args.variant_id, args.quantity),
    onSuccess: async (res) => {
      return res;
    },
    onError: (err: Error) => {
      return err;
    },
  });

  // REMOVE PRODUCT FROM CART
  const removeProductMutation = useMutation({
    mutationFn: (args: { cartId: string; lineItemId: string }) =>
      removeCartItem(args.cartId, args.lineItemId),
    onSuccess: async (res) => {
      return res;
    },
    onError: (err: Error) => {
      return err;
    },
  });

  // UPDATE PRODUCT QUANTITY IN CART
  const updateProductQuantityMutation = useMutation({
    mutationFn: (args: {
      cartId: string;
      lineItemId: string;
      quantity: number;
    }) => updateCartItem(args.cartId, args.lineItemId, args.quantity),
    onSuccess: async (res) => {
      return res;
    },
    onError: (err: Error) => {
      console.log(err);
      return err;
    },
  });

  // APPLY PROMOTION
  const applyPromotionMutation = useMutation({
    mutationFn: (args: { cartId: string; promoCodes: string[] }) =>
      applyPromotion(args.cartId, args.promoCodes),
    onSuccess: async (res) => {
      console.log(res);
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });

  // REMOVE PROMOTION
  const removePromotionMutation = useMutation({
    mutationFn: (cartId: string) => removePromotion(cartId),
    onSuccess: async (res) => {
      console.log(res);
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });

  // CREATE PAYMENT COLLECTION
  const createPaymentCollectionMutation = useMutation({
    mutationFn: (cartId: string) => createPaymentCollection(cartId),
    onSuccess: async (res) => {
      console.log(res);
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });

  // INITIALIZE PAYMENT SESSION
  const initializePaymentSessionMutation = useMutation({
    mutationFn: (paymentCollectionId: string) =>
      initializePaymentSession(paymentCollectionId),
    onSuccess: async (res) => {
      console.log(res);
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });

  // COMPLETE CART
  const completeCartMutation = useMutation({
    mutationFn: (cartId: string) => completeCart(cartId),
    onSuccess: async (res) => {
      console.log(res);
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });

  return {
    cart: data,
    isLoading,
    isError,
    createCart: {
      createCartMutation: createCartMutation.mutate,
      createCartMutationAsync: createCartMutation.mutateAsync,
      isLoading: createCartMutation.isPending,
      isError: createCartMutation.isError,
    },
    setCustomer: {
      setCustomerMutation: setCustomerMutation.mutate,
      setCustomerMutationAsync: setCustomerMutation.mutateAsync,
      isLoading: setCustomerMutation.isPending,
      isError: setCustomerMutation.isError,
    },
    addProduct: {
      addProductMutation: addProductMutation.mutate,
      addProductMutationAsync: addProductMutation.mutateAsync,
      isLoading: addProductMutation.isPending,
      isError: addProductMutation.isError,
    },
    checkAvailableStock: {
      checkAvailableStockMutation: checkAvailableStockMutation.mutate,
      checkAvailableStockMutationAsync: checkAvailableStockMutation.mutateAsync,
      isLoading: checkAvailableStockMutation.isPending,
      isError: checkAvailableStockMutation.isError,
    },
    removeProduct: {
      removeProductMutation: removeProductMutation.mutate,
      removeProductMutationAsync: removeProductMutation.mutateAsync,
      isLoading: removeProductMutation.isPending,
      isError: removeProductMutation.isError,
    },
    updateProductQuantity: {
      updateProductQuantityMutation: updateProductQuantityMutation.mutate,
      updateProductQuantityMutationAsync:
        updateProductQuantityMutation.mutateAsync,
      isLoading: updateProductQuantityMutation.isPending,
      isError: updateProductQuantityMutation.isError,
    },
    applyPromotion: {
      applyPromotionMutation: applyPromotionMutation.mutate,
      applyPromotionMutationAsync: applyPromotionMutation.mutateAsync,
      isLoading: applyPromotionMutation.isPending,
      isError: applyPromotionMutation.isError,
    },
    removePromotion: {
      removePromotionMutation: removePromotionMutation.mutate,
      removePromotionMutationAsync: removePromotionMutation.mutateAsync,
      isLoading: removePromotionMutation.isPending,
      isError: removePromotionMutation.isError,
    },
    createPaymentCollection: {
      createPaymentCollectionMutation: createPaymentCollectionMutation.mutate,
      createPaymentCollectionMutationAsync:
        createPaymentCollectionMutation.mutateAsync,
      isLoading: createPaymentCollectionMutation.isPending,
      isError: createPaymentCollectionMutation.isError,
    },
    initializePaymentSession: {
      initializePaymentSessionMutation: initializePaymentSessionMutation.mutate,
      initializePaymentSessionMutationAsync:
        initializePaymentSessionMutation.mutateAsync,
      isLoading: initializePaymentSessionMutation.isPending,
      isError: initializePaymentSessionMutation.isError,
    },
    completeCart: {
      completeCartMutation: completeCartMutation.mutate,
      completeCartMutationAsync: completeCartMutation.mutateAsync,
      isLoading: completeCartMutation.isPending,
      isError: completeCartMutation.isError,
    },
    ...rest,
  };
};
