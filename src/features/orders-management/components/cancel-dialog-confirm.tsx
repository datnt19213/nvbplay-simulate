import { toastNVB } from "@/components/base-components/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/queries/orders";
import { RootState } from "@/stores";
import { updateOrderDetailData } from "@/stores/datas/orders-data-slice";
import { useDispatch, useSelector } from "react-redux";

const CancelDialogConfirm = ({ orderId }: { orderId: string }) => {
  const dispatch = useDispatch();
  const orderDetail = useSelector(
    (state: RootState) => state.order_data_slice.orderDetail
  );
  const { cancelOrderMutation } = useOrders();
  const handleCancelOrder = async () => {
    try {
      await cancelOrderMutation.cancelOrderAsync({
        orderID: orderId,
      });
      toastNVB({
        type: "success",
        msg: "Hủy đơn hàng thành công",
      });
      const orderDetailUpdate = {
        ...orderDetail,
        status: "canceled",
      };
      dispatch(updateOrderDetailData(orderDetailUpdate));
    } catch (error) {
      console.log(error);
      toastNVB({
        type: "error",
        msg: "Hủy đơn hàng thất bại",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Hủy đơn</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yêu cầu hủy đơn hàng?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn hủy đơn hàng này không? <br />
            <span className="text-red-500">
              Lưu ý: Hủy đơn hàng sẽ không thể hoàn tác được.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancelOrder}>
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelDialogConfirm;
