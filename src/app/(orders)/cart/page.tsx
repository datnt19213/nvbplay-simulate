import dynamic from "next/dynamic";

const CartFeature = dynamic(() => import("@/features/cart"));
const CartPage = () => {
  return <CartFeature />;
};

export default CartPage;
