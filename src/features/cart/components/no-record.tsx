import { NotRecord } from "@/assets/images";
import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NoRecord = () => {
  return (
    <div className="h-[560px] flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image
          src={NotRecord.src}
          alt="not-record"
          className="w-[300px] h-auto"
        />
        <p className="max-w-[300px] text-sm font-medium text-center">
          Không có sản phẩm nào trong giỏ hàng. Hãy tiếp tục mua sắm nhé!
        </p>
        <Button className="">
          <Link href="/">Tiếp tục mua sắm</Link>
        </Button>
      </div>
    </div>
  );
};

export default NoRecord;
