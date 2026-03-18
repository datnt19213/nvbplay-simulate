import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { AllPaymentMethod } from "./all-payment-method";
import { PaymentAction } from "./cta";
import { EstimateTrial } from "./estimate-trial";
import { PaymentMethod } from "./payment-method";
import { SubcriblePromotion } from "./promotion";

const SubcribleDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <DialogResponsive
      dialogClassname="min-w-[1000px] w-[1000px] md:h-[640px] h-[99vh] p-0 m-0 border-none"
      trigger={
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Đăng ký ngay
        </Button>
      }
      open={open}
      setOpen={setOpen}
    >
      <div className="flex md:hidden justify-between items-center">
        <div />
        <div className="text-base font-semibold mt-2">Thanh toán</div>
        <div />
      </div>

      <div className="w-full h-[1px] bg-neutral-200 md:hidden" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 p-0 m-0 h-[99vh] md:h-[40rem] overflow-y-scroll md:overflow-hidden scrollbar-thin">
        {/* LEFT */}
        <div className="relative flex justify-center items-center">
          {/* IMAGE */}
          <Image
            src="/images/subcription/register-bg.png"
            alt="register"
            width={1000}
            height={640}
            className="hidden md:block absolute inset-0 w-full h-full min-h-[800px] object-cover z-[-1]"
          />

          {/* LINEAR BACKGROUND */}
          <div className="hidden md:block absolute inset-0 w-full h-full bg-gradient-to-b from-[#011E24] to-[#090D14] opacity-50 z-[-1]" />

          <div className="flex flex-col gap-4 p-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-sm md:text-base text-neutral-900 md:text-neutral-300 font-medium">
                  Gói đã chọn
                </h2>
                <p className="text-base md:text-xl md:text-neutral-200 text-neutral-900 font-bold">
                  12 tháng
                </p>
                <p className="text-sm text-neutral-700 md:text-neutral-500 font-medium">
                  1 tháng dùng thử
                </p>
                <p className="text-xs text-[#0B74E5] font-semibold">
                  Thay đổi gói khác
                </p>
              </div>
              <div className="text-base md:text-xl md:text-neutral-200 text-neutral-900 font-bold -mt-5 md:-mt-0 ">
                650.000 đ
              </div>
            </div>

            <div className="w-full h-[1px] bg-neutral-800 my-4" />

            <EstimateTrial />
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:relative flex flex-col gap-4 px-2 py-5">
          <div className="flex flex-col gap-2">
            {/* Promotion */}
            <div className="w-full flex flex-col gap-5 py-4 rounded-lg bg-white">
              <SubcriblePromotion />
            </div>

            {/* Payment */}
            <div className="w-full flex flex-col gap-5 py-4 rounded-lg bg-white">
              {/* Heading */}
              <div className="flex items-center justify-between px-4">
                <h2 className="font-semibold leading-6">
                  Phương thức thanh toán
                </h2>
                <AllPaymentMethod>
                  <span className="text-neutral-500 text-sm font-semibold cursor-pointer">
                    Xem tất cả
                  </span>
                </AllPaymentMethod>
              </div>

              {/* Body */}
              <div className="w-full md:h-[160px] mb-14 md:mb-0 md:overflow-y-scroll md:scrollbar-thin">
                <PaymentMethod />
              </div>
            </div>
          </div>

          {/* Actions */}
          <PaymentAction />
        </div>
      </div>
    </DialogResponsive>
  );
};

export default SubcribleDialog;
