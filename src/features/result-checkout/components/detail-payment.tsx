import { Stripe } from "@/assets/icons";
import Image from "@/components/base-components/images/image";

const DetailPayment = () => {
  return (
    <div className="w-full flex flex-col gap-5 p-4 rounded-lg bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium leading-6">Phương thức thanh toán</h2>
        <div className="border p-4 rounded-lg gap-3 flex items-center">
          <Image
            src={Stripe.src}
            alt="payment"
            className="size-8"
            classNameImage="object-contain"
          />
          <p className="flex flex-col">
            <span className="text-sm font-semibold leading-5">
              Thanh toán Stripe
            </span>
            <span className="text-sm leading-5">
              Thanh toán qua cổng thanh toán Stripe
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPayment;
