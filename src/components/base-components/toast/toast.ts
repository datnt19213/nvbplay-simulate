import { ToastCustom } from ".";

export const ToastNotification = ({
  msg,
  type,
}: {
  msg: string;
  type?: string;
}) => {
  return ToastCustom({
    className: "",
    msg: msg,
  });
};
