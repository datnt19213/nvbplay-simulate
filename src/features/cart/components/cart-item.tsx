import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { AmountAction } from "@/components/base-components/counter/amount-action";
import { FormatCurrency } from "@/utilities/text";
import {
  addItem,
  removeItem,
  setCartData,
  setCartItems,
  setIsLoading,
  setItemsActive,
  updateItemQuantity,
} from "@/stores/datas/cart-slice";
import { useDebouncedValue } from "@/hooks/use-debounced";
import Image from "@/components/base-components/images/image";
import useGetProductByHandleQuery from "@/hooks/queries/products/useGetProductByHandleQuery";
import { RootState } from "@/stores";
import { useCarts } from "@/hooks/queries/cart";
import { toastNVB } from "@/components/base-components/toast";
import useIsFirstRender from "@/hooks/use-first-render";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CartItem = ({
  item,
  cartId,
  isOutOfStock,
}: {
  cartId: string;
  item: any;
  isOutOfStock: boolean;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const dispatch = useDispatch();
  const isUserChange = useRef(false);
  const { itemsActive } = useSelector((state: RootState) => state.cart_slice);
  const [quantity, setQuantity] = useState(item?.quantity);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [debouncedQuantity] = useDebouncedValue(quantity, 1500);
  const { data } = useGetProductByHandleQuery(`${item.product_handle}`);
  const { checkAvailableStock, removeProduct, addProduct } = useCarts();
  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (item?.variant_id && data?.variants) {
      const variant = data?.variants.find(
        (variant: any) => variant.id === item.variant_id
      );

      if (variant && data?.options) {
        const defaultOptions: Record<string, string> = {};

        data?.options.forEach((option: any) => {
          const selectedValue = variant.options.find(
            (opt: any) => opt.option_id === option.id
          );
          if (selectedValue) {
            defaultOptions[option.id] = selectedValue.value;
          }
        });

        setSelectedOptions(defaultOptions);
        // Đặt lại cờ sau khi khởi tạo giá trị
        isUserChange.current = false;

        setMaxQuantity(
          (variant?.stocked_quantity || 0) - (variant?.reserved_quantity || 0)
        );
      }
    }
  }, [item, data]);
  const handleUpdateQuantity = useCallback(
    async (quantity: number, lineItemId: string) => {
      const res: any =
        await checkAvailableStock.checkAvailableStockMutationAsync({
          variant_id: item?.variant_id,
          quantity: debouncedQuantity,
        });
      if (
        res &&
        res.status === 200 &&
        res.data.result === "success" &&
        res.data?.data?.isAvailable
      ) {
        dispatch(updateItemQuantity({ cartId, lineItemId, quantity }));
      } else {
        setQuantity(res.data?.data?.availableQuantity);
        toastNVB({
          msg: "Sản phẩm đã hết hàng, vui lòng đổi loại sản phẩm khác",
          type: "error",
        });
      }
      setMaxQuantity(res.data?.data?.availableQuantity);
      dispatch(setIsLoading(false));
    },
    [debouncedQuantity]
  );

  useEffect(() => {
    if (item.availability) {
      setMaxQuantity(item.availability);
    }
  }, [item.availability]);

  useEffect(() => {
    if (debouncedQuantity !== item?.quantity) {
      handleUpdateQuantity(debouncedQuantity, item.id);
    }
  }, [debouncedQuantity]);

  const handleRemoveItem = async () => {
    const res: any = await removeProduct.removeProductMutationAsync({
      cartId,
      lineItemId: item?.id,
    });
    if (res) {
      dispatch(removeItem({ lineItemId: item?.id }));
    }
  };

  const handleSelectItem = () => {
    dispatch(
      setItemsActive(
        itemsActive?.includes(item?.id)
          ? itemsActive?.filter((activeItem: string) => activeItem !== item?.id)
          : [...(itemsActive || []), item?.id]
      )
    );
  };

  const selectedVariant = useMemo(() => {
    if (
      !data?.variants ||
      !data?.options ||
      Object.keys(selectedOptions).length !== data?.options?.length
    ) {
      return;
    }

    return data?.variants.find((variant: any) =>
      variant.options?.every(
        (optionValue: any) =>
          optionValue.value === selectedOptions[optionValue.option_id!]
      )
    );
  }, [selectedOptions, data]);

  const isSale = useMemo(() => {
    return (
      selectedVariant?.calculated_price?.calculated_price?.price_list_type ===
      "sale"
    );
  }, [selectedVariant]);

  //   Lấy giá sale
  const salePrice = useMemo(() => {
    return FormatCurrency(
      selectedVariant?.calculated_price?.calculated_amount || 0
    );
  }, [selectedVariant]);
  //   Lấy giá gốc
  const originalPrice = useMemo(() => {
    return FormatCurrency(
      selectedVariant?.calculated_price?.original_amount || 0
    );
  }, [selectedVariant]);

  const handleChangeVariant = useCallback(async () => {
    if (!isUserChange.current) return; // Chỉ gọi nếu thay đổi từ người dùng
    try {
      dispatch(setIsLoading(true));
      if (selectedVariant && item?.variant_id !== selectedVariant.id) {
        if (
          (selectedVariant?.stocked_quantity || 0) -
            (selectedVariant?.reserved_quantity || 0) >
          0
        ) {
          const res: any = await removeProduct.removeProductMutationAsync({
            cartId,
            lineItemId: item?.id,
          });
          if (res) {
            const res: any = await addProduct.addProductMutationAsync({
              variant_id: selectedVariant.id,
              quantity: quantity,
              metadata: {},
            });
            if (res) {
              dispatch(setCartItems(res?.cart?.items));
              dispatch(
                setItemsActive(res?.cart?.items?.map((item: any) => item.id))
              );
            }
          }
        } else {
          const variant = data?.variants.find(
            (variant: any) => variant.id === item.variant_id
          );

          data?.options.forEach((option: any) => {
            const selectedValue = variant?.options.find(
              (opt: any) => opt.option_id === option.id
            );
            if (selectedValue) {
              setSelectedOptions({
                ...selectedOptions,
                [option.id]: selectedValue.value,
              });
            }
          });

          toastNVB({
            msg: "Sản phẩm đã hết hàng, vui lòng đổi loại sản phẩm khác",
            type: "error",
          });
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      toastNVB({
        msg: "Cập nhật sản phẩm thất bại",
        type: "error",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [selectedVariant]);

  useEffect(() => {
    if (isFirstRender) return;

    handleChangeVariant();
  }, [selectedVariant]);

  useEffect(() => {
    setQuantity(item?.quantity);
  }, [item?.quantity]);

  return (
    <div>
      {/* DESKTOP */}
      <div className="hidden desktop:block">
        <div
          className={cn("flex items-center p-4 gap-3 select-none", {
            "opacity-50": isOutOfStock,
          })}
        >
          <Checkbox
            checked={itemsActive?.includes(item?.id)}
            className="size-5 rounded border-gray-200 bg-gray-100 data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800"
            onClick={handleSelectItem}
            disabled={isOutOfStock}
          />
          <div className="flex flex-1 items-center gap-1">
            <div className="flex items-center w-[304px]">
              <div className="flex items-center gap-3">
                <div className="object-cover aspect-square">
                  <Image
                    src={item?.thumbnail || undefined}
                    alt="product_image"
                    className={cn(
                      "rounded-lg border border-gray-200 !size-20 flex items-center justify-center"
                    )}
                    classNameImage={cn(
                      isOutOfStock ? "grayscale" : "",
                      "size-[68px]"
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Link
                    href={`/products/${item?.product_handle || ""}?variantId=${item?.variant_id}`}
                    className="text-sm font-medium leading-5 line-clamp-2 hover:text-primary/80 duration-300"
                  >
                    {item?.product_title} {item?.title}
                  </Link>
                  <div className="flex items-center gap-1">
                    {data?.options?.map((option: any, index: number) => (
                      <Select
                        disabled={isOutOfStock}
                        key={index}
                        value={selectedOptions[option.id] || ""}
                        onValueChange={(value) => {
                          isUserChange.current = true; // Đánh dấu thay đổi từ người dùng
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [option.id]: value,
                          }));
                        }}
                      >
                        <SelectTrigger className="bg-[#F5F5FA] rounded-lg min-w-[85px] border-none text-xs">
                          <SelectValue placeholder={option.title} />
                        </SelectTrigger>
                        <SelectContent>
                          {option?.values?.map((value: any) => {
                            const variant = data?.variants.find(
                              (variant: any) =>
                                variant.options.some(
                                  (opt: any) =>
                                    opt.option_id === option.id &&
                                    opt.value === value.value
                                )
                            );
                            const outOfStock =
                              (variant?.stocked_quantity || 0) -
                                (variant?.reserved_quantity || 0) <=
                              0;
                            return (
                              <SelectItem
                                className="disabled:cursor-not-allowed"
                                key={value.id}
                                value={value.value}
                                disabled={outOfStock}
                              >
                                {value.value}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex flex-1 items-center">
                <div className="flex flex-grow flex-col items-center">
                  <p className="text-sm font-semibold leading-5">
                    {isSale ? salePrice : originalPrice}
                  </p>
                  <p className="text-xs line-through leading-[18px] text-muted-foreground">
                    {isSale ? originalPrice : ""}
                  </p>
                </div>
                <div className="flex flex-grow flex-col items-center gap-2">
                  <AmountAction
                    disabled={isOutOfStock}
                    min={1}
                    max={maxQuantity}
                    value={quantity}
                    onChange={(value) => {
                      setQuantity(value);
                      dispatch(setIsLoading(true));
                    }}
                  />
                  <p
                    className={cn(
                      "text-xs leading-[18px]",
                      isOutOfStock ? "text-red-500" : "text-[#CC8100]"
                    )}
                  >
                    {isOutOfStock ? "Hết hàng" : `Còn ${maxQuantity} sản phẩm`}
                  </p>
                </div>
                <p className="text-base font-semibold items-end leading-6">
                  {FormatCurrency(item?.quantity * item?.unit_price)}
                </p>
              </div>
              <Button
                disabled={isOutOfStock}
                onClick={handleRemoveItem}
                variant="ghost"
                className="group hover:bg-rose-700"
                size="icon"
              >
                <Trash2Icon className="size-5 text-gray-500 group-hover:text-white transition-colors duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="block w-full desktop:hidden">
        <div className="flex items-center flex-1 p-4 gap-3 select-none">
          <Checkbox
            disabled={isOutOfStock}
            checked={itemsActive?.includes(item?.id)}
            onClick={handleSelectItem}
            className="size-5 rounded border-gray-200 bg-gray-100 data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800"
          />
          <div className="flex flex-1 items-center gap-1">
            <div className="flex flex-1 items-center">
              <div className="flex flex-1 items-start gap-3">
                <Image
                  src={item?.thumbnail || undefined}
                  alt="product_image"
                  className="rounded-lg border border-gray-200 size-20 flex items-center justify-center"
                  classNameImage="size-[68px]"
                />
                <div className="flex flex-col w-full items-start gap-2 flex-1">
                  <Link
                    href={`/products/${item?.product_handle || ""}?variantId=${item?.variant_id}`}
                    className="text-sm font-medium leading-5 hover:text-primary/80 duration-300"
                  >
                    {item?.product_title} {item?.title}
                  </Link>
                  <div className="flex items-center gap-1">
                    {data?.options?.map((option: any, index: number) => (
                      <Select
                        disabled={isOutOfStock}
                        key={index}
                        value={selectedOptions[option.id] || ""}
                        onValueChange={(value) => {
                          isUserChange.current = true; // Đánh dấu thay đổi từ người dùng
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [option.id]: value,
                          }));
                        }}
                      >
                        <SelectTrigger className="bg-[#F5F5FA] rounded-lg min-w-[85px] border-none text-xs">
                          <SelectValue placeholder={option.title} />
                        </SelectTrigger>
                        <SelectContent>
                          {option?.values?.map((value: any) => {
                            const variant = data?.variants.find(
                              (variant: any) =>
                                variant.options.some(
                                  (opt: any) =>
                                    opt.option_id === option.id &&
                                    opt.value === value.value
                                )
                            );
                            const outOfStock =
                              (variant?.stocked_quantity || 0) -
                                (variant?.reserved_quantity || 0) <=
                              0;
                            return (
                              <SelectItem
                                key={value.id}
                                value={value.value}
                                disabled={outOfStock}
                              >
                                {value.value}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-semibold leading-5">
                        {isSale ? salePrice : originalPrice}
                      </p>
                      <p className="text-xs line-through leading-[18px] text-muted-foreground">
                        {isSale ? originalPrice : ""}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <AmountAction
                        disabled={isOutOfStock}
                        min={1}
                        value={quantity}
                        onChange={(value) => {
                          setQuantity(value);
                          dispatch(setIsLoading(true));
                        }}
                      />
                      <p
                        className={cn(
                          "text-xs leading-[18px]",
                          isOutOfStock ? "text-red-500" : "text-[#CC8100]"
                        )}
                      >
                        {isOutOfStock
                          ? "Hết hàng"
                          : `Còn ${maxQuantity} sản phẩm`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
