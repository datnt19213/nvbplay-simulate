import copyIcon from "@/assets/icons/copy-icon.svg";
// import strokeHeart from "@/assets/icons/stroke-heart-icon.svg";
import RatingStar from "@/components/ui/rating-star";
import {createCart, getCartData} from "@/services/cart";
import {RootState} from "@/stores";
import {setCartData} from "@/stores/datas/cart-slice";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import {Suspense, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ComboProductsContainer from "./combo-products/combo-products-container";
import {ShowProductPrice} from "./show-product-price";
import ProductImagesSlider from "./slider/product-images-slider";
import ProductVideos from "./slider/product-videos";
import VariantContainer2 from "./variants/variant-container-2";
// import BottomSticky from "./bottom-sticky";
// import BuyControllerBox from "./buy-controller-box";
import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";
import useSearchFilter from "@/hooks/useSearchFilter";

const MainContainer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromLogin = searchParams.get("fromLogin");

  const data = useSelector((state: RootState) => state.detail_product.data)!;
  const cartData = useSelector((state: RootState) => state.cart_slice.cart);
  const {user} = useSelector((state: RootState) => state.users_data);
  const selectedVariant = useSelector(
    (state: RootState) => state.detail_product.variant
  );
  const {dispatchItem, handleSelect} = useSearchFilter("selectedProviders");
  const dispatch = useDispatch();

  // Hooks
  const {isCopied, copyToClipboard} = useCopyToClipboard();

  // Copy SKU to clipboard
  const handleCopySKU = () => {
    copyToClipboard(selectedVariant?.sku || data?.variants[0]?.sku);
  };

  const handleBrandClick = () => {
    const payload = {
      label: data?.brand?.name || "",
      value: data?.brand?.slug || "",
    };

    dispatchItem(payload);
    handleSelect(payload);
    router.push(`/products`);
  };

  useEffect(() => {
    const handleFetchCardAndSetCardAfterLogin = () => {
      const fetchCartData = async () => {
        try {
          const cartId = localStorage.getItem("cart_id");

          // Step 1: Check if cart ID exists locally
          if (!cartId) {
            await createNewCart();
            return;
          }

          // Step 2: Fetch existing cart
          const data = await getCartData();

          // if (data?.status === 200 && !data.data.cart.payment_collection) {
          if (data) {
            dispatch(setCartData(data.cart));
          } else {
            // Invalid cart or payment collected, create a new cart
            await createNewCart();
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          await createNewCart();
        }
      };

      const createNewCart = async () => {
        if (!user?.email) {
          // redirect("/auth", RedirectType.push);
        }
        const res: any = await createCart(user?.email);
        if (res) {
          dispatch(setCartData(res.cart));
          localStorage.setItem("cart_id", res.cart.id);
        }
      };

      if (!cartData) {
        fetchCartData();
      }
    };

    if (fromLogin) {
      handleFetchCardAndSetCardAfterLogin();
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div className="space-y-[32px]">
          <ProductImagesSlider images={data?.images?.map((i) => i.url) || []} />
          {/* <ProductVideos className="hidden md:block" /> */}
        </div>
        <div className="space-y-[20px] py-[24px] md:px-[40px]">
          <div className="flex gap-0 md:gap-[16px] justify-between md:justify-start text-gray-icon text-sm items-center flex-wrap">
            {data?.brand?.name && (
              <div>
                Thương hiệu:{" "}
                <span
                  className="text-blue-hovered cursor-pointer"
                  onClick={handleBrandClick}
                >
                  {data?.brand?.name || ""}
                </span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span>SKU: {selectedVariant?.sku || data?.variants[0]?.sku}</span>
              <button onClick={handleCopySKU}>
                <Image src={copyIcon} alt="icon" width={24} height={24} />
              </button>
              {isCopied && (
                <span className="bg-[#ff3f1a] text-orange-100 rounded-full px-2 py-1 text-xs font-semibold ">
                  Copied
                </span>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-txtprimary">
            {data?.title}
          </h1>
          <div className="divide-x-2 relative divide-gray-bland flex items-center text-txtsecondary text-[14px] leading-[21px] font-[400]">
            <div className="flex items-center gap-2 pr-2">
              <RatingStar amount={4} total={5} />
              <span>(12)</span>
            </div>
            <span className="pl-2 ">
              Đã bán {data?.variants[0]?.reserved_quantity || 0}{" "}
            </span>
            {/* <button className="absolute top-1/2 -translate-y-1/2 right-0">
              <Image src={strokeHeart} alt="heart" width={18} height={18} />
            </button> */}
          </div>
          {/* <FlashSalePriceBox /> */}
          <ShowProductPrice />
          {/* <PreOrderPriceBox />
        <SoldOutPriceBox /> */}

          <div className="space-y-[12px]">
            {/* <DiscountContainer /> */}
            {/* <GiftsContainer /> */}
            {/* <PolicyContainer /> */}
            {/* <VariantContainer /> */}
            <VariantContainer2 />
            {/* <BuyControllerBox/> */}
            <ComboProductsContainer />
            {/* <SoldOutContactForm /> */}
            <ProductVideos className="md:hidden" />
            {/* <BottomSticky /> */}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default MainContainer;
