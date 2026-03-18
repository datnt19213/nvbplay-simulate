import { cn } from "@/lib/utils";

interface ColorPaletteProps {
  colors: string[]; // Mảng các mã màu (dạng hex hoặc CSS color)
  active?: boolean; // Trạng thái active để áp dụng hiệu ứng viền
  onClick?: () => void;
}

const ColorPalette = ({ colors, active, onClick }: ColorPaletteProps) => {
  const maxColors = 3; // Giới hạn số lượng màu tối đa là 3
  const limitedColors = colors.slice(0, maxColors); // Lấy tối đa 3 màu từ mảng đầu vào

  // Tạo chuỗi gradient từ các màu được giới hạn
  const gradients = limitedColors
    .map((color, index, array) => {
      const percentage = 100 / array.length; // Tính khoảng cách phần trăm giữa các màu
      return `${color} ${index * percentage}%, ${color} ${(index + 1) * percentage}%`;
    })
    .join(", "); // Kết hợp các đoạn màu thành một chuỗi

  return (
    <div
      onClick={onClick && onClick}
      className={cn("rounded-full cursor-pointer border-2 border-transparent", {
        "border-black": active, // Thêm viền đen nếu `active` là true
      })}
    >
      <div
        className="size-[22px] rounded-full border-2 border-[#DDDDE3]"
        style={{
          // Nếu chỉ có 1 màu, tô màu nền toàn bộ, nếu có nhiều màu, tạo gradient
          background:
            limitedColors.length === 1
              ? limitedColors[0]
              : `linear-gradient(135deg, ${gradients})`,
        }}
      />
    </div>
  );
};

export default ColorPalette;
