import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FormatCurrency } from "@/utilities/text";
import { useDispatch } from "react-redux";
import { setCartData } from "@/stores/datas/cart-slice";
import { useCarts } from "@/hooks/queries/cart";
import { ToastError } from "../../toast";
import { ToastDismiss } from "../../toast";

interface ProductCartProps {
  item: any;
  cartId: string;
}
const ProductCart = ({ cartId, item }: ProductCartProps) => {
  const dispatch = useDispatch();
  const { removeProduct } = useCarts();
  const handleRemoveCartItem = async () => {
    try {
      const res: any = await removeProduct.removeProductMutationAsync({
        cartId: cartId,
        lineItemId: item.id,
      });

      if (res) {
        dispatch(setCartData(res.parent));
      }
    } catch (error: any) {
      ToastDismiss();
      ToastError({
        className: "",
        msg: "Đã có lỗi xảy ra! " + error.message,
      });
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-[72px] h-[72px]">
          <Image
            src={item?.thumbnail ? item.thumbnail : undefined}
            alt="product"
            className="aspect-square rounded border w-full h-full flex items-center justify-center"
            classNameImage="h-[3.5rem] w-auto object-center"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[14px] leading-[21px] font-semibold line-clamp-2">
            {item?.title || ""}
          </p>
          <p className="text-[14px] leading-[21px] text-muted-foreground">
            {item?.variant?.title || ""}
          </p>
          <span className="text-xs">x{item?.quantity || 1}</span>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between items-end gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 hover:text-primary"
          onClick={handleRemoveCartItem}
        >
          <Trash className="size-5 text-muted-foreground" />
        </Button>
        <p className="text-sm font-semibold leading-[21px]">
          {FormatCurrency(item.unit_price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCart;
