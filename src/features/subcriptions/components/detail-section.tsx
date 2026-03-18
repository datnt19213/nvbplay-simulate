import { subcription } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check } from "lucide-react";

const DetailSection = () => {
  return (
    <div className="p-6 gap-6 rounded-lg bg-white flex flex-col">
      <h2 className="text-xl font-semibold text-center">Chi tiết quyền lợi</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[66px] desktop:w-[352px]"></TableHead>
            <TableHead className="w-[66px] desktop:w-[200px] uppercase text-center">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-sm desktop:text-base font-semibold">
                  Miễn phí
                </div>
              </div>
            </TableHead>
            <TableHead className="w-[66px] desktop:w-[200px] text-center">
              <div className="w-full h-full flex items-center justify-center">
                <img src={subcription.src} />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-center">
            <TableCell className="font-medium text-start">
              Miễn phí vận chuyển (/tháng)
            </TableCell>
            <TableCell>2 lượt</TableCell>
            <TableCell className="bg-gray-50">Không giới hạn</TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-medium text-start">
              Quà tặng sinh nhật
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell className="bg-gray-50">
              <div className="w-full h-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-medium text-start">
              Voucher độc quyền
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell className="bg-gray-50">
              <div className="w-full h-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-medium text-start">
              Giảm giá sản phẩm mới
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell className="bg-gray-50">
              <div className="w-full h-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-medium text-start">
              Điểm danh nhận ưu đãi miễn phí
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell className="bg-gray-50">
              <div className="w-full h-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-medium text-start">
              Tham gia minigame độc quyền
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell className="bg-gray-50">
              <div className="w-full h-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-medium text-start">
              Vòng quay may mắn mỗi ngày
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell className="bg-gray-50">
              <div className="w-full h-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DetailSection;
