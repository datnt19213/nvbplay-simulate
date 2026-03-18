import { Crown, FreeShipping, Gift, Minigame, Voucher } from "@/assets/icons";
import Image from "@/components/base-components/images/image";

const privileges = [
  {
    icon: FreeShipping,
    title: "Miễn phí vận chuyển",
    description: "Không giới hạn miễn phí vận chuyển hằng tháng.",
  },
  {
    icon: Gift,
    title: "Quà tặng hằng tháng",
    description: "Bộ quà tặng độc quyền dành riêng cho hội viên mỗi tháng.",
  },
  {
    icon: Minigame,
    title: "Minigame độc quyền",
    description: "Tham gia các trò chơi để dành được quà tặng hấp dẫn.",
  },
  {
    icon: Voucher,
    title: "Ưu đãi lên đến hằng triệu đồng",
    description: "Voucher giảm giá cực sâu lên đến 1.000.000 đ.",
  },
  {
    icon: Crown,
    title: "Ưu đãi khi mua các sản phẩm mới",
    description:
      "Nhận được giá ưu đãi khi mua các sản phẩm mới ra mắt được bán tại NVB Play.",
  },
];
const PrivilegeSection = () => {
  return (
    <div className="p-6 gap-6 rounded-lg bg-white flex flex-col">
      <h2 className="text-xl font-semibold text-center">
        Đặc quyền cho hội viên
      </h2>
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3">
        {privileges.map((privilege, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-4 bg-[#F5F5FA] rounded-lg p-4"
          >
            <div className="!size-[42px] aspect-square">
              <Image src={privilege.icon.src} />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-base font-medium">{privilege.title}</div>
              <div className="text-sm text-muted-foreground">
                {privilege.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivilegeSection;
