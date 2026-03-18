import { cn } from "@/lib/utils";
import Heading from "../atom/heading";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { da } from "date-fns/locale";
import { useState } from "react";

// const items = [
//   {
//     label: "Thương hiệu",
//     value: "Adidash",
//   },
//   {
//     label: "Đối tượng",
//     value: "Nam,Nữ",
//   },
//   {
//     label: "Màu sắc	",
//     value: "Đen Trắng, Đen Vàng",
//   },
//   {
//     label: "Size",
//     value: "M, L, XL, XXL",
//   },
// ];

interface IProps {
  className?: string;
}

const DetailInfoContainer: React.FC<IProps> = ({ className }) => {
  const data = useSelector((state: RootState) => state.detail_product.data);
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className={cn("flex-1 p-[16px] space-y-[16px]", className)}>
      <Heading title="Thông tin chi tiêt" />
      <div>
        {data?.options
          ?.slice(0, showMore ? data?.options?.length : 4)
          .map((i, index) => (
            <div
              className={cn(
                "flex p-[12px] gap-[16px]",
                index % 2 == 0 && "bg-[#F5F5FA] rounded-lg"
              )}
              key={index}
            >
              <div className="min-w-[150px] max-w-[150px] text-sm font-medium text-[#64646D]">
                {i.title}
              </div>
              <div className="flex-1 text-[#38383d] text-sm font-medium line-clamp-1">
                {i.values?.map((value) => value.value).join(", ")}
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        {data?.options && data?.options.length > 4 && (
          <button
            className="py-[8px] px-[16px] text-[#ff3f1a] font-[600] mx-auto"
            onClick={handleShowMore}
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailInfoContainer;
