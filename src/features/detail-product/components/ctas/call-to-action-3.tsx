import shoppingIcon from "@/assets/icons/shopping-cart-plus.svg";
import { toastNVB } from "@/components/base-components/toast";
import { Button } from "@/components/ui/button";
import { useCarts } from "@/hooks/queries/cart";
import { cn } from "@/lib/utils";
import { Cart } from "@/services/cart/type";
import { RootState } from "@/stores";
import { setCartData } from "@/stores/datas/cart-slice";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  className?: string;
  disabled?: boolean;
  canAction?: boolean;
}

export const showError = (message: string) => {
  toastNVB({ msg: message, type: "error" });
};

const CallToAction3: React.FC<IProps> = ({
  className,
  disabled,
  canAction = true,
}) => {
  const params = useParams();
  const router = useRouter();

  // state
  const { user } = useSelector((state: RootState) => state.users_data);
  const detailProductState = useSelector(
    (state: RootState) => state.detail_product
  );
  const selectedVariant = useSelector(
    (state: RootState) => state.detail_product.variant
  );
  const { addProduct } = useCarts();
  const dispatch = useDispatch();

  const onClick = async ({ isBuyNow = false }: { isBuyNow?: boolean }) => {
    if (
      selectedVariant &&
      Number(selectedVariant.stocked_quantity) -
        Number(selectedVariant.reserved_quantity) <=
        0
    ) {
      return showError(
        "Sản phẩm đã hết hàng, vui lòng đổi màu sắc hoặc số lượng!"
      );
    }

    if (!selectedVariant?.calculated_price) {
      return showError("Sản phẩm chưa có giá, vui lòng đổi sản phẩm khác!");
    }

    if (!user) {
      showError("Vui lòng đăng nhập để mua hàng");
      setTimeout(() => {
        router.push(`/auth?redirect=products/${params?.slug}?variantId=${selectedVariant.id}`);
      }, 2000);
      return;
    }

    try {
      if (!selectedVariant) {
        return showError(
          "Không tìm thấy sản phẩm, xin vui lòng thử sản phẩm khác"
        );
      }

      const res = await addProduct.addProductMutationAsync({
        variant_id: selectedVariant.id,
        quantity: detailProductState.quantity,
        metadata: {},
      });

      if (res) {
        handleAddToCartSuccess(res);
      }

      if (isBuyNow) {
        router.push(`/cart`);
      }
    } catch (error: any) {
      handleAddToCartError(error);
    }
  };

  const handleAddToCartSuccess = (res: any) => {
    dispatch(setCartData(res?.cart as Cart));
    toastNVB({ msg: "Đã thêm sản phẩm vào giỏ hàng", type: "success" });
  };

  const handleAddToCartError = (error: any) => {
    const errorMsg = error?.response?.data?.error || "Lỗi không xác định";
    toastNVB({
      msg: `Có lỗi xảy ra, xin vui lòng thử lại sau. ${errorMsg}`,
      type: "error",
    });
  };

  return (
    <div className={cn("flex mt-[20px] gap-[12px] w-full bg-white", className)}>
      <button
        onClick={() => onClick({})}
        disabled={
          addProduct.isLoading ||
          disabled ||
          !selectedVariant ||
          Number(selectedVariant.stocked_quantity) -
            Number(selectedVariant.reserved_quantity) <=
            0 ||
          !selectedVariant?.calculated_price
        }
        // w-[58px] min-w-[58px]
        className={cn(
          "flex-1 h-[2.75rem] rounded-[8px] border border-[#ff3f1a] text-[#ff3f1a] flex justify-center items-center gap-1 font-[600] disabled:opacity-40"
        )}
      >
        {addProduct.isLoading ? (
          <>
            <Loader2 className="size-[20px] animate-spin" />
            <span>Đang xử lý...</span>
          </>
        ) : (
          <>
            <Image
              src={shoppingIcon}
              alt="icon"
              width={20}
              height={20}
              className="stroke-[1.5] "
            />
            Thêm vào giỏ
          </>
        )}
      </button>
      <Button
        disabled={
          addProduct.isLoading ||
          disabled ||
          !selectedVariant ||
          Number(selectedVariant.stocked_quantity) -
            Number(selectedVariant.reserved_quantity) <=
            0 ||
          !selectedVariant?.calculated_price
        }
        className="h-[2.75rem] flex-1 flex-col items-center !px-0 !gap-0 disabled:text-black/75 disabled:bg-neutral-200"
        onClick={() => onClick({ isBuyNow: true })}
      >
        Mua ngay
        {selectedVariant &&
          Number(selectedVariant.stocked_quantity) -
            Number(selectedVariant.reserved_quantity) <=
            0 && <span className="text-[12px] leading-[18px]">(Hết hàng)</span>}
      </Button>
      {/* <Button
        disabled={
          disabled ||
          !selectedVariant ||
          Number(selectedVariant.stocked_quantity) -
            Number(selectedVariant.reserved_quantity) <=
            0
        }
        className="h-[56px] flex flex-col !gap-0 items-center flex-1 bg-[#090d14] hover:bg-[#090d14] !px-0 disabled:text-black/75 disabled:bg-neutral-200"
      >
        <span>Trả góp</span>
        <span className="text-[12px] leading-[18px]">(Chỉ từ 99.000 đ)</span>
      </Button> */}
    </div>
  );
};

export default CallToAction3;
