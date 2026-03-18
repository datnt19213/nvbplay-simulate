import { Button } from "@/components/ui/button";
import CreditCards from "@/features/checkout/components/credit-cards";

export const PaymentAction = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 p-3 w-full flex flex-col justify-center items-center gap-1">
      <div className="w-full">
        <CreditCards>
          <Button variant="bluePrimary" className="w-full">
            Thanh toán và dùng thử
          </Button>
        </CreditCards>
      </div>
      <span className="text-neutral-500 text-xs font-bold">
        Tự động gia hạn sau 12 tháng, hủy bất cứ lúc nào.
      </span>
    </div>
  );
};
