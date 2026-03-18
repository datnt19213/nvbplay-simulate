import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { PaymentMethod } from "./payment-method";

export const AllPaymentMethod = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogResponsive
      dialogClassname="md:h-[640px] md:w-[30rem] h-[99vh] w-fit border-none"
      trigger={<>{children}</>}
      open={open}
      setOpen={setOpen}
    >
      <div className="relative md:h-[640px] md:w-[30rem] h-[99vh]">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div />
            <h2 className="font-semibold text-neutral-800">
              Phương thức thanh toán
            </h2>
            <div />
          </div>
          <PaymentMethod />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 w-full bg-white border-t border-neutral-300">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Đồng ý
          </Button>
        </div>
      </div>
    </DialogResponsive>
  );
};
