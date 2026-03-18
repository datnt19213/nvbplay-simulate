import dynamic from "next/dynamic";
import { Suspense } from "react";

const CheckoutFeature = dynamic(() => import("@/features/checkout"));

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutFeature />
    </Suspense>
  );
};

export default CheckoutPage;
