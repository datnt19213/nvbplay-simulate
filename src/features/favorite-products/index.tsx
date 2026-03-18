"use client";
import { Cart } from "@/assets/icons";
import { FavoriteEmpty } from "@/assets/images";
import EmptyItem from "@/components/base-components/cta/empty-item";
import { Icon } from "@/components/common-components";
import { RootState } from "@/stores";
import { translate } from "@/utilities/translator";
import React, { HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { VariantWishlist } from "@/services/wishlist/type";

const FavoriteProducts = () => {
  //   const user = useSelector((state: RootState) => state.users_data.user);
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  //   const channel = useSelector(
  //     (state: RootState) => state.sale_channel.activeSaleChannel
  //   );
  //   const { data, isLoading } = useWishlist(user?.id);
  //   const { createWishlistMutation } = useWishlistMutation();
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     if (data && data.length > 0) {
  //       dispatch(setWishlist(data[0]));
  //     } else {
  //       if (user && channel) {
  //         createWishlistMutation.mutate({
  //           customer_id: user?.id,
  //           sales_channel_id: channel?.id,
  //         });
  //       }
  //     }
  //   }, [data]);
  return (
    <>
      <div className="w-full h-[72px] bg-white rounded-lg flex items-center gap-3 px-4">
        <span className="font-semibold text-lg">
          {translate("favorite_products")}
        </span>
        <span className="font-semibold text-gray-icon">(8)</span>
      </div>
      <div className="grid gap-3 grid-cols-1 desktop:grid-cols-2">
        {wishlist &&
          wishlist?.items &&
          wishlist?.items?.length > 0 &&
          wishlist?.items?.map((item, index) => (
            <FavoriteItem
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              key={index}
              data={item}
            />
          ))}
        {wishlist?.items?.length === 0 && (
          <EmptyItem
            className="col-span-1 desktop:col-span-2"
            image={FavoriteEmpty.src}
            title={translate("favorite_list_is_empty")}
            titleClass="text-center text-txtfifth"
            subTitleClass="text-center text-txtfifth"
            subTitle={translate(
              "please_❤️_the_product_you_love_when_shopping_to_review_the_most_convenient"
            )}
            isNavigable={false}
          />
        )}
        {/* <TimeoutAction
          tick={10000}
          loading={
            true ||
            setTimeout(() => {
              return false;
            }, 1000)
          }
          onTickComponent={Array.from({ length: 4 }).map((_, index) => (
            <FavoriteSkeleton key={index} />
          ))}
          onEndComponent={
            <EmptyItem
              className="col-span-1 desktop:col-span-2"
              image={FavoriteEmpty.src}
              title={translate("favorite_list_is_empty")}
              titleClass="text-center text-txtfifth"
              subTitleClass="text-center text-txtfifth"
              subTitle={translate(
                "please_❤️_the_product_you_love_when_shopping_to_review_the_most_convenient"
              )}
              isNavigable={false}
            />
          }
        /> */}
      </div>
    </>
  );
};

export default FavoriteProducts;

const FavoriteItem = ({
  data,
  ...props
}: { data: VariantWishlist } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className="flex items-center gap-2 p-3 rounded-lg bg-white animate-fade-up"
    >
      <div className="flex items-center justify-center p-3">
        <div className="border-gray-border overflow-hidden rounded-lg h-[158px] w-[158px] aspect-square flex items-center justify-center relative">
          {/* <DarkOverlayTransparent open={"het_hang" === "het_hang"}>
            {translate("temporary")}
          </DarkOverlayTransparent> */}
          <img
            src={data?.product_variant?.product?.thumbnail}
            className="h-full w-auto object-center z-0 relative"
          />
        </div>
      </div>
      <div className="h-full w-full p-3 pl-0 flex flex-col justify-between">
        <div className="flex gap-3 w-full">
          <div className="flex flex-col w-full items-start gap-2">
            <span className="font-medium text-sm text-wrap line-clamp-2 text-txtprimary">
              {data?.product_variant?.title}
            </span>
            <div className="flex w-full items-center justify-start text-gray-icon">
              <Icon icon="ph:storefront" fontSize={16} />
              <span className="fontmedium text-xs">
                {translate("settle")}: 192
              </span>
            </div>
          </div>
          <div className="h-6 w-6 aspect-square cursor-pointer rounded-full bg-gray-primary flex items-center justify-center">
            <Icon icon="ph:dots-three" fontSize={16} />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col w-full">
            <span className="text-txtthird font-bold">1.350.000 đ</span>
            <span className="text-gray-icon text-xs font-medium line-through">
              1.900.000 đ
            </span>
          </div>
          <div className="h-10 w-10 aspect-square rounded-full flex items-center justify-center bg-txtthird/10 cursor-pointer">
            <img src={Cart.src} className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
