"use client";
import ProductCard from "@/components/base-components/cards/product-card";
import ProductCardSkeleton from "@/components/base-components/skeletons/product-card-skeleton";
import { toastNVB } from "@/components/base-components/toast";
import Heading from "@/components/base-components/typography/heading";
import { useCarts } from "@/hooks/queries/cart";
import { useCollections } from "@/hooks/queries/collections";
import useMediaQueryScreen from "@/hooks/useMediaQueryScreen";
import useSearchFilter from "@/hooks/useSearchFilter";
import { FadeUpMotionLayout } from "@/layouts/component-layouts";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { setCartData } from "@/stores/datas/cart-slice";
import { setCollections } from "@/stores/datas/collections";
import { FilterOption } from "@/stores/search-slice";
import { Content, Slice } from "@prismicio/client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface ProductFeatureType {
  slice: Content.ProductsSlice;
}

const ProductFeature = ({ slice }: ProductFeatureType) => {
  const dispatch = useDispatch();
  const collectionsData = useSelector(
    (state: RootState) => state.collections.collections
  );

  const { dispatchItem, handleSelect, selectedItems } = useSearchFilter(
    "selectedCollections"
  );
  const { isMobile } = useMediaQueryScreen();
  const { data: collections, isLoading, isFetching } = useCollections();
  const { addProduct } = useCarts();
  const handleAddToCart = async (id: string, e: React.MouseEvent) => {
    try {
      const target = e.currentTarget; // The clicked element (button or card)
      const rect = target.getBoundingClientRect();

      // Get the cart button position dynamically
      const cartButton = document.getElementById("cart-button");
      const cartRect = cartButton?.getBoundingClientRect();

      if (cartRect) {
        // Clone the clicked element (e.g., product image or button)
        const clone = target.cloneNode(true) as HTMLElement;
        clone.style.position = "fixed";
        clone.style.top = `${rect.top}px`;
        clone.style.left = `${rect.left}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.transition = "all 0.6s ease-in-out";
        clone.style.zIndex = "1000";
        document.body.appendChild(clone);

        // Trigger the animation by setting the destination position
        setTimeout(() => {
          clone.style.top = `${cartRect.top + cartRect.height / 2}px`;
          clone.style.left = `${cartRect.left + cartRect.width / 2}px`;
          clone.style.width = "20px";
          clone.style.height = "20px";
          clone.style.opacity = "0.5";
        }, 0);

        // Remove the clone after the animation ends
        setTimeout(() => {
          clone.remove();
        }, 600);

        // Add item to the cart
        const response: any = await addProduct.addProductMutationAsync({
          variant_id: id,
          quantity: 1,
          metadata: {},
        });

        if (response) {
          dispatch(setCartData(response.cart));
          toastNVB({
            type: "success",
            msg: "Thêm sản phẩm thành công",
          });
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setCollections(collections));
  }, [collections]);

  const newCollection = useMemo(() => {
    if (collectionsData && collectionsData.length > 0) {
      return collectionsData?.find(
        (item: any) => item.collection_handle === "new-product"
      );
    }
  }, [collectionsData]);
  const bestSellerCollection = useMemo(() => {
    if (collectionsData && collectionsData.length > 0) {
      return collectionsData?.find(
        (item: any) => item.collection_handle === "best-seller"
      );
    }
  }, [collectionsData]);

  const onClick = (item: FilterOption) => {
    handleSelect(item);
    if (!isMobile) dispatchItem(item);
  };

  if (isLoading || isFetching) {
    return <ProductFeatureSkeleton slice={slice} />;
  }

  return (
    <>
      {slice.variation === "default" &&
        newCollection?.products &&
        newCollection?.products?.length > 0 && (
          <div className={cn("flex flex-col gap-4")}>
            <div className="flex items-center justify-between">
              <Heading>{newCollection?.collection_name}</Heading>
              <Link
                onClick={() =>
                  onClick({
                    label: newCollection?.collection_name || "",
                    value: newCollection?.collection_handle || "",
                  })
                }
                href={`/products`}
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                Xem tất cả
              </Link>
            </div>
            <div className="grid grid-cols-2 row-auto sm:grid-cols-3 desktop:grid-cols-5 gap-[12.5px]">
              {newCollection?.products
                ?.slice(0, 5)
                .map((item: any, index: number) => (
                  <ProductCard key={index} {...item} />
                ))}
            </div>
          </div>
        )}
      {slice.variation === "bestSellerProducts" &&
        bestSellerCollection?.products &&
        bestSellerCollection?.products?.length > 0 && (
          <div className={cn("flex flex-col gap-4")}>
            <div className="flex items-center justify-between">
              <Heading>{bestSellerCollection?.collection_name}</Heading>
              <Link
                href={`/products`}
                className="text-sm font-medium text-primary hover:text-primary/80"
                onClick={() =>
                  onClick({
                    label: bestSellerCollection?.collection_name || "",
                    value: bestSellerCollection?.collection_handle || "",
                  })
                }
              >
                Xem tất cả
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 desktop:grid-cols-5 gap-[12.5px]">
              {bestSellerCollection?.products
                ?.slice(0, 5)
                .map((item: any, index: number) => (
                  <ProductCard key={index} {...item} />
                ))}
            </div>
          </div>
        )}
    </>
  );
};

export default ProductFeature;

export const ProductFeatureSkeleton = ({
  slice,
}: {
  slice: Content.ProductsSlice;
}) => {
  return (
    <>
      {slice.variation === "default" && (
        <div className={cn("flex flex-col gap-4")}>
          <div className="flex items-center justify-between">
            <Heading>Hàng mới đổ bộ</Heading>
            <span className="text-sm font-medium text-primary hover:text-primary/80">
              Xem tất cả
            </span>
          </div>
          <div className="grid grid-cols-2 row-auto sm:grid-cols-3 desktop:grid-cols-5 gap-[12.5px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      )}
      {slice.variation === "bestSellerProducts" && (
        <div className={cn("flex flex-col gap-4")}>
          <div className="flex items-center justify-between">
            <Heading>Sản phẩm bán chạy</Heading>
            <span className="text-sm font-medium text-primary hover:text-primary/80">
              Xem tất cả
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 desktop:grid-cols-5 gap-[12.5px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} withButton={true} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
