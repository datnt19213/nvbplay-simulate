import dot3 from "@/assets/icons/3-dot.svg";
import circleCheck from "@/assets/icons/circle-check.svg";
import product from "@/assets/images/product-item.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingStar from "@/components/ui/rating-star";
import Image from "next/image";

const items = ["Màu sắc: Trắng đen", "Kích thước: L (169 - 175cm, 68 - 75 kg)"];

const ReviewItem = () => {
  return (
    <div className="space-y-[12px]">
      {/* row1 */}
      <div className="flex gap-[12px]">
        <Avatar className="size-[40px] min-w-[40px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[12px]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col ">
              <span className="text-sm text-txtfifth">Thanh Nguyễn</span>
              <span className="text-[12px] leading-[18px] font-[400] text-txtsecondary">
                20 phút trước
              </span>
            </div>
            <button className="size-[40px] flex justify-center items-center">
              <Image src={dot3} alt="3-dot" width={21} height={24} />
            </button>
          </div>
          <div className="flex gap-[12px]">
            <RatingStar amount={4} total={5} />
            <div className="flex items-center gap-[4px]">
              <Image src={circleCheck} alt="3-dot" width={20} height={20} />
              <span className="text-sm text-[#079449]">Đã mua hàng</span>
            </div>
          </div>
        </div>
      </div>
      {/* row2 */}
      <div className="flex gap-[12px]">
        <div className="min-w-[40px] hidden md:block" />
        {/* content */}
        <div className="space-y-[12px] flex-1">
          <p className="text-txtfifth text-sm font-[400]">
            Bí Quyết Chọn Vợt Pickleball: Đơn Giản, Hiệu Quả - Bí Quyết Chọn Vợt
            Pickleball: Đơn Giản, Hiệu Quả - Bí Quyết Chọn Vợt Pickleball: Đơn
            Giản, Hiệu Quả
          </p>
          <div className="flex flex-wrap gap-[12px]">
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <button
                  key={index}
                  className="size-[80px] relative rounded-[8px] overflow-hidden"
                >
                  <Image
                    src={product}
                    fill
                    alt="product"
                    className="object-cover"
                  />
                </button>
              ))}
          </div>
          <div className="flex flex-wrap gap-[16px] gap-y-[4px]">
            {items.map((item, index) => (
              <span className="text-[#808089] text-sm" key={index}>
                {item}
              </span>
            ))}
          </div>
        </div>
        {/* content */}
      </div>
    </div>
  );
};

export default ReviewItem;
