import { toastNVB } from "@/components/base-components/toast";
import { useCarts } from "@/hooks/queries/cart";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { setQuantity } from "@/stores/detail-product-slice";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  className?: string;
  showLabel?: boolean;
}

const QuantityController: React.FC<IProps> = ({
  className,
  showLabel = true,
}) => {
  const { variant, selectedColor, selectedSize } = useSelector(
    (state: RootState) => state.detail_product
  );
  const [maxQuantity, setMaxQuantity] = useState(
    variant?.stocked_quantity - variant?.reserved_quantity
  );
  const { checkAvailableStock } = useCarts();
  const [quantity, setQuantityState] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (variant) {
      setMaxQuantity(variant?.stocked_quantity - variant?.reserved_quantity);
      setQuantityState(1);
    }
  }, [variant]);

  const checkAvailableQuantity = async () => {
    const res = await checkAvailableStock.checkAvailableStockMutationAsync({
      variant_id: variant?.id,
      quantity: quantity,
    });
    if (
      res &&
      res.status === 200 &&
      res.data.result === "success" &&
      res.data.data.isAvailable
    ) {
      setMaxQuantity(res.data.data.availableQuantity);
      return true;
    }
    return false;
  };

  const increaseQuantity = async () => {
    const isAvailable = await checkAvailableQuantity();
    if (isAvailable) {
      setQuantityState((prev) => {
        if (prev < maxQuantity) {
          return prev + 1;
        }
        return prev;
      });
    } else {
      toastNVB({
        msg: "Sản phẩm đã hết hàng, vui lòng đổi loại sản phẩm khác",
        type: "error",
      });
    }
  };

  const decreaseQuantity = async () => {
    const isAvailable = await checkAvailableQuantity();
    if (isAvailable) {
      setQuantityState((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    } else {
      toastNVB({
        msg: "Sản phẩm đã hết hàng, vui lòng đổi loại sản phẩm khác",
        type: "error",
      });
    }
  };

  // Set quantity to redux
  useEffect(() => {
    dispatch(setQuantity(quantity));
  }, [quantity, dispatch]);

  return (
    <div
      className={cn(
        "space-x-[20px] mt-[20px] flex items-center text-sm font-[500]",
        className
      )}
    >
      {showLabel && <span className="text-[#515158]">Chọn số lượng</span>}

      <div className="space-x-[4px] flex">
        <button
          disabled={quantity === 1}
          onClick={decreaseQuantity}
          className="size-[40px] disabled:opacity-60 disabled:cursor-not-allowed rounded-[4px] border border-[#c4c4cf] flex justify-center items-center"
        >
          <Icon icon="line-md:minus" width="14" height="14" />
        </button>
        <div className="size-[40px] font-[400] rounded-[4px] border border-[#c4c4cf] flex justify-center items-center">
          {quantity}
        </div>
        <button
          disabled={quantity === maxQuantity || maxQuantity === 0}
          onClick={increaseQuantity}
          className="size-[40px] rounded-[4px] border border-[#c4c4cf] flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Icon icon="line-md:plus" width="14" height="14" />
        </button>
      </div>
    </div>
  );
};

export default QuantityController;
