import VoucherItem, { IVoucherItem } from "./voucher-item";

const HotVoucherTab = () => {
  const coupons: IVoucherItem[] = [
    {
      code: "NMTNN1",
      discount: "Giảm 50K",
      minPurchase: 200,
      category: "sản phẩm vợt cầu lông",
      expiryDate: "11/04/2024",
      multiplier: 5,
    },
    // Duplicate the same coupon 5 more times to match the image
    ...Array(5).fill({
      code: "NMTNN1",
      discount: "Giảm 50K",
      minPurchase: 200,
      category: "sản phẩm vợt cầu lông",
      expiryDate: "11/04/2024",
      multiplier: 5,
    }),
  ];

  return (
    <div className="space-y-[16px]">
      <div className="flex justify-between items-center">
        <h2 className="text-16-24-600">Mã giảm giá</h2>
        <button className="text-txtthird text-14-21-600 hover:underline">
          Khám phá thêm
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map((coupon, index) => (
          <VoucherItem key={index} coupon={coupon} />
        ))}
      </div>
    </div>
  );
};

export default HotVoucherTab;
