import { Button } from "@/components/ui/button";
import { useWishlistMutation } from "@/hooks/queries/wishlist";
import useDebouncedAction from "@/hooks/use-debounce-action";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { addWishlist, removeWishlist, setWishlist } from "@/stores/wishlist";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const HeartActionWishList = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { addItemToWishlistMutation, removeItemFromWishlistMutation } =
    useWishlistMutation();
  const user = useSelector((state: RootState) => state.users_data.user);
  const channel = useSelector(
    (state: RootState) => state.sale_channel.activeSaleChannel
  );
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  //   Giữ giá trị item trước khi thay đổi
  const isFavoriteItems = wishlist?.items?.find(
    (item) => item.product_variant_id === id
  );
  //   const handleAddToWishlist = async () => {
  //     if (user && channel && id) {
  //       if (wishlist?.items?.some((item) => item.product_variant_id === id)) {
  //         const itemId = wishlist?.items?.find(
  //           (item) => item.product_variant_id === id
  //         )?.id;
  //         if (itemId) {
  //           const res = await removeItemFromWishlistMutation.mutateAsync({
  //             customer_id: user?.id,
  //             wishlist_item_id: itemId,
  //           });
  //           if (res) {
  //             dispatch(removeWishlist(id));
  //           }
  //         }
  //       } else {
  //         const res = await addItemToWishlistMutation.mutateAsync({
  //           customer_id: user?.id,
  //           variant_id: id,
  //           sales_channel_id: channel?.id,
  //         });
  //         if (res) {
  //           dispatch(setWishlist(res.data.data));
  //         }
  //       }
  //     }
  //   };

  const handleAddToWishList = async () => {
    const isWishList = wishlist?.items?.some(
      (item) => item.product_variant_id === id
    );
    if (!isWishList) {
      await addItemToWishlistMutation.mutateAsync({
        customer_id: user?.id,
        variant_id: id,
        sales_channel_id: channel?.id || "",
      });
    } else {
      const itemId = wishlist?.items?.find(
        (item) => item.product_variant_id === id
      )?.id;
      await removeItemFromWishlistMutation.mutateAsync({
        customer_id: user?.id,
        wishlist_item_id: itemId || "",
      });
    }
  };

  const { triggerAction } = useDebouncedAction({
    action: handleAddToWishList,
    delay: 500, // Chờ 500ms trước khi gửi request
    onError: () => {
      if (isFavoriteItems) {
        dispatch(removeWishlist(id));
        dispatch(addWishlist(isFavoriteItems));
      } else {
        dispatch(removeWishlist(id));
      }
    },
  });

  const handleChangeWishList = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm vào danh sách yêu thích");
      router.push(`/auth`);
      return;
    }

    const newValue = !wishlist?.items?.some(
      (item) => item.product_variant_id === id
    );
    if (newValue) {
      dispatch(addWishlist({ product_variant_id: id }));
    } else {
      dispatch(removeWishlist(id));
    }

    triggerAction(newValue);
  };
  return (
    <Button
      onClick={handleChangeWishList}
      variant="ghost"
      className="size-[30px] p-0.5 rounded-full text-primary bg-[#F5F5FA]"
    >
      <Heart
        className={cn("size-5 mt-0.5", {
          "fill-primary": wishlist?.items?.some(
            (item) => item.product_variant_id === id
          ),
        })}
      />
    </Button>
  );
};

export default HeartActionWishList;
