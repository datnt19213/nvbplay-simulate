import { Logo } from "@/assets/images";
import { Icon } from "@/components/common-components";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import ProductItem from "../elements/product-item";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { FormatCurrency } from "@/utilities/text";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useOrders } from "@/hooks/queries/orders";
import { toastNVB } from "@/components/base-components/toast";

const ProductsList = () => {
  const { order } = useSelector((state: RootState) => state.order_slice);
  const { addNoteOrderMutation } = useOrders();

  const [note, setNote] = useState(order?.metadata?.note || "");

  useEffect(() => {
    if (order) {
      setNote(order?.metadata?.note || "");
    }
  }, [order]);

  const handleAddNoteOrder = async (note: string) => {
    try {
      const res = await addNoteOrderMutation.addNoteOrderAsync({
        orderID: order?.id || "",
        data: {
          note: note,
        },
      });
      if (res) {
        toastNVB({
          type: "success",
          msg: "Thêm lời nhắn thành công",
        });
      }
    } catch (error) {
      toastNVB({
        type: "error",
        msg: "Thêm lời nhắn thất bại",
      });
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="desktop:grid hidden grid-cols-12 p-4">
        <p className="w-full text-left col-span-5">Sản phẩm</p>
        <p className="w-full text-center col-span-2">Đơn giá</p>
        <p className="w-full text-center col-span-2">Số lượng</p>
        <p className="w-full text-right col-span-3">Thành tiền</p>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2 items-center text-sm font-semibold text-gray-fifth">
          <img
            src={Logo.src}
            alt="logo"
            className="rounded-full h-7 w-7 aspect-square"
          />
          <span>NVB Play</span>
        </div>
        <div className="flex gap-2 items-center font-semibold text-sm text-gray-icon">
          <Icon icon="ph:chat-circle-dots" fontSize={24} />
          <span>Nhắn tin</span>
        </div>
      </div>
      <div className="p-4 flex flex-col w-full gap-8">
        {order?.items.map((item: any, index: number) => (
          <ProductItem key={index} item={item} />
        ))}
      </div>
      <div className="p-4 flex justify-end border-t border-gray-border gap-2">
        <span className="font-medium text-[#64646D]">
          Tạm tính ({order?.items.length} sản phẩm):
        </span>
        <span className="font-semibold text-txtprimary">
          {FormatCurrency(order?.original_item_total || 0)}
        </span>
      </div>
      <div className="p-4 flex gap-2 flex-col border-t border-gray-border">
        <span className="text-sm font-semibold text-txtprimary">Lời nhắn</span>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Lời nhắn cho shop: (Ví dụ: Không hiển thị tên sản phẩm khi đóng gói)"
          className="bg-gray-primary py-2 pl-4 pr-2 border-none focus-visible:!border-none hover:!border-none min-h-[107px] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="flex justify-end">
          <Button
            disabled={addNoteOrderMutation.isLoading || note.length === 0}
            onClick={() => handleAddNoteOrder(note)}
          >
            <Plus className="size-5" />
            Thêm lời nhắn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
