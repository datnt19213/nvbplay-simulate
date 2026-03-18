"use client";

import notFound from "@/assets/images/not-found.png";
import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container w-full h-[80vh] flex flex-col gap-3 items-center justify-center">
      <Image src={notFound.src} width={300} height={263} alt="not-found" />
      <p className="text-base text-center">
        Trang bạn đang tìm kiếm không khả dụng hoặc không tồn tại!
        <br />
        Vui lòng thử lại nhé!
      </p>
      {/* <p className="text-base font-medium my-5">Mã lỗi: {error?.message}</p> */}
      <div className="flex items-center gap-2 mt-10">
        <Button variant="outline" asChild>
          <Link href="/">Quay lại trang chủ</Link>
        </Button>
        <Button onClick={() => reset()}>Thử lại</Button>
      </div>
    </div>
  );
}
