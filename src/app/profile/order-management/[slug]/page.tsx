import OrderManagementFeatures from "@/features/orders-management";
type Params = {slug: string};
const DetailOrder = async ({params}: {params: Promise<Params>}) => {
  const {slug} = await params;
  return (
    <div className="flex flex-col gap-3 w-full">
      <OrderManagementFeatures orderId={slug} />
    </div>
  );
};

export default DetailOrder;
