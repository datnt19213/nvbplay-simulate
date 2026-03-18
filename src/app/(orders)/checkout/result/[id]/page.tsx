import dynamic from "next/dynamic";

const ResultCheckoutFeature = dynamic(
  () => import("@/features/result-checkout")
);
const CheckoutResultPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const orderId = (await params).id;
  const status = (await searchParams).status;
  return <ResultCheckoutFeature orderId={orderId + ""} status={status + ""} />;
};

export default CheckoutResultPage;
