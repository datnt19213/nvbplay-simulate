import bookmarkOff from "@/assets/icons/bookmark-off.svg";
import logo from "@/assets/icons/logo-badge.svg";
import shareIcon from "@/assets/icons/share-icon.svg";
import Image from "next/image";

const BookMarkItem = () => {
  return (
    <div className="rounded-[8px] bg-white overflow-hidden">
      <div className="w-full aspect-[2] bg-green-200"></div>
      <div className="p-[16px] pt-[12px] space-y-[12px]">
        <h3 className="text-14-21-600 text-txtfifth">
          Bí Quyết Chọn Vợt Pickleball: Đơn Giản, Hiệu Quả
        </h3>
        <div className="flex gap-2 items-center">
          <Image
            alt="logo"
            src={logo}
            width={40}
            height={40}
            className="size-[40px] rounded-full"
          />
          <div className="flex-1">
            <div className="text-14-21-600 text-txtfifth">NVB Play</div>
            <div className="text-12-18-500 text-txtsecondary">8 giờ trước</div>
          </div>
          <button className="rounded-[8px] size-[40px] flex justify-center items-center bg-[#f5f5fa]">
            <Image alt="logo" src={shareIcon} width={20} height={20} />
          </button>
          <button className="rounded-[8px] size-[40px] bg-[#f5f5fa] flex justify-center items-center">
            <Image alt="logo" src={bookmarkOff} width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookMarkItem;
