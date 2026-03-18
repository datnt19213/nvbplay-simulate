import mtVoucher from "@/assets/images/empty-voucher.png";
import Image from "next/image";

const EmptyVoucher = () => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center h-full items-center">
      <Image src={mtVoucher} width={240} height={240} alt="empty-voucher" />
      <p className="text-14-21-600 text-txtfifth">
        Ví voucher rỗng. Hãy khá phá thêm.
      </p>
    </div>
  );
};

export default EmptyVoucher;
