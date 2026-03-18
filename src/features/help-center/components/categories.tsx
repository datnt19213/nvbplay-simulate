import Bounded from "@/components/base-components/containers/bounded";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { convertToSlug } from "@/utilities/text";
import {
  CarTaxiFront,
  Dock,
  Shield,
  Star,
  TicketPercent,
  UserCircle,
} from "lucide-react";
import Link from "next/link";

const CategoriesData = [
  {
    icon: <UserCircle className="size-6" />,
    title: "Tài khoản",
    desc: "Địa chỉ, thông tin các nhân, số điện thoại....",
  },
  {
    icon: <CarTaxiFront className="size-6" />,
    title: "Thanh toán",
    desc: "Phương thức thanh toán, mua trả góp,...",
  },
  {
    icon: <Shield className="size-6" />,
    title: "Đổi trả và bảo hành",
    desc: "Hướng dẫn đóng gói, cách gửi yêu cầu đổi trả và bảo hàng,...",
  },
  {
    icon: <Star className="size-6" />,
    title: "Hội viên",
    desc: "Cách thức đăng ký, quyền lợi hội viên, cách hủy đăng ký hội viên,...",
  },
  {
    icon: <TicketPercent className="size-6" />,
    title: "Giảm giá/Ưu đãi",
    desc: "Cách sử dụng ưu đãi, tìm thêm nhiều ưu đãi, các chươn trình ưu đãi...",
  },
  {
    icon: <Dock className="size-6" />,
    title: "Dịch vụ/Chương trình",
    desc: "Chi phí lắp đặt, chươn g trình hoàn xu NVB, chương trình giảm giá hằng năm,...",
  },
];

const CategoryItem = ({ item }: { item: (typeof CategoriesData)[0] }) => {
  return (
    <Link href={`/help-center/${convertToSlug(item.title)}`}>
      <div className="p-3 border border-neutral-300 rounded-lg min-h-[150px]">
        <div className="flex items-center gap-2 mb-3">{item.icon}</div>
        <div className="text-base font-medium">{item.title}</div>
        <div className="text-sm text-neutral-500 font-medium">{item.desc}</div>
      </div>
    </Link>
  );
};

export const Categories = ({
  type = "list",
  className,
}: {
  type?: "list" | "accordion";
  className?: string;
}) => {
  return (
    <Bounded className="bg-white rounded-lg mt-4">
      {type == "list" ? (
        <div className={cn("", className)}>
          <h3 className="text-xl text-neutral-700 font-semibold mb-4">
            Danh mục hổ trợ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CategoriesData?.map((item, index) => (
              <CategoryItem key={index} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-0 !bg-white"
          >
            {CategoriesData?.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none !bg-white data-[state=open]:text-[#FF3F1A] !py-0 !my-0"
              >
                <AccordionTrigger className="!text-base font-medium !my-0 !py-1">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="!text-neutral-700 !text-sm font-medium !py-1 !my-0">
                  {item.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </Bounded>
  );
};
