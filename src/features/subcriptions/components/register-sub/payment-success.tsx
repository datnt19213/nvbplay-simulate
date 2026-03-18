"use client";

import { NVBPlay_Subcription } from "@/assets/icons";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const PaymentSuccess = () => {
  const [open, setOpen] = useState(true);

  return (
    <DialogResponsive
      dialogClassname="w-full h-full md:min-w-[1000px] md:h-[600px] border-none"
      sheetClassname="h-screen border-none"
      open={open}
      setOpen={setOpen}
      trigger={<></>}
    >
      <div className="w-full h-screen md:min-w-[1000px] md:h-[600px] relative flex flex-col items-center justify-center rounded-none desktop:rounded-lg overflow-hidden">
        <div className="absolute w-full h-screen md:h-full inset-0">
          <Image
            src={"/images/subcription/payment-ss-bg.jpg"}
            className="w-full h-screen md:h-full object-cover z-0 "
          />
        </div>
        <div className="flex flex-col items-center gap-8 justify-center z-10">
          <Image src={NVBPlay_Subcription.src} className="h-[153px]" />
          <div className="flex flex-col items-center justify-center max-w-[25rem]">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="text-white text-[32px] leading-[48px] font-bold text-center">
                Chào mừng bạn đến với Hội viên NVB Play
              </div>
              <div className="text-white text-base font-medium text-center">
                Hãy bắt đầu trải nghiệm các quyền lợi độc quyền dành cho hội
                viên của chúng tôi.
              </div>
            </div>
          </div>
          <Button variant="bluePrimary" className="w-fit" onClick={() => setOpen(false)}>
            Bắt đầu trải nghiệm
          </Button>
        </div>
      </div>
    </DialogResponsive>
  );
};
