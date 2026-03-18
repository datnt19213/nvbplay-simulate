"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@iconify/react";
import { Inbox, Bell, InboxContent } from "@novu/react";
// import Notifications from "@/features/notification/components/notifications";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { getGlobalKey } from "@/services/globals";
import { GlobalKeys } from "@/services/globals";

export const notifications = [
  {
    id: 1,
    title: "Giao hàng thành công",
    description:
      "Đơn hàng #11042024  đã được giao thành công, đánh giá sản phẩm để nhận thêm nhiều ưu đãi!",
    isReadable: false,
    createdAt: "2024-04-05T09:30:00",
  },
  {
    id: 2,
    title: "Đơn hàng mới",
    description:
      "Đơn hàng #11042024 đã được giao thành công, đánh giá sản phẩm để nhận thêm nhiều ưu đãi!",
    isReadable: false,
    createdAt: "2024-04-06T11:30:00",
  },
  {
    id: 3,
    title: "Đơn hàng đã thanh toán",
    description:
      "Đơn hàng #11042026 đã thanh toán thành công, vui lòng chờ xem đơn hàng.",
    isReadable: true,
    createdAt: "2024-04-07T13:30:00",
  },
  {
    id: 4,
    title: "Đơn hàng mới",
    description:
      "Đơn hàng #11042024 đã được giao thành công, đánh giá sản phẩm để nhận thêm nhiều ưu đãi!",
    isReadable: false,
    createdAt: "2024-04-06T11:30:00",
  },
  {
    id: 5,
    title: "Đơn hàng mới",
    description:
      "Đơn hàng #11042024 đã được giao thành công, đánh giá sản phẩm để nhận thêm nhiều ưu đãi!",
    isReadable: false,
    createdAt: "2024-04-06T11:30:00",
  },
  {
    id: 6,
    title: "Đơn hàng mới",
    description:
      "Đơn hàng #11042024 đã được giao thành công, đánh giá sản phẩm để nhận thêm nhiều ưu đãi!",
    isReadable: false,
    createdAt: "2024-04-06T11:30:00",
  },
  {
    id: 7,
    title: "Đơn hàng mới",
    description:
      "Đơn hàng #11042024 đã được giao thành công, đánh giá sản phẩm để nhận thêm nhiều ưu đãi!",
    isReadable: false,
    createdAt: "2024-04-06T11:30:00",
  },
];

type NotificationProps = {
  icon: string;
  name: string;
};
const Notification = ({ icon, name }: NotificationProps) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.users_data.user);
  return (
    <Inbox
      applicationIdentifier={getGlobalKey(GlobalKeys.NOVU_APP_INDEN) || ""}
      subscriberId={user?.id || ""}
      routerPush={(path: string) => router.push(path)}
    >
      <Popover>
        <PopoverTrigger>
          <Bell
            renderBell={(unreadCount) => (
              <div className="flex items-center gap-2 text-white hover:text-primary transition-colors duration-200 cursor-pointer">
                <div className="size-5 relative">
                  <Icon icon={icon} className="size-5 z-0" />
                  {unreadCount > 0 && (
                    <p className="p-1 pt-1 size-[18px] rounded-full bg-red-500 text-white absolute -top-1.5 -right-1.5 flex items-center justify-center text-[10px]">
                      {unreadCount}
                    </p>
                  )}
                </div>
                {name}
              </div>
            )}
          />
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          className="w-[25rem] max-h-[25rem] p-0 rounded-2xl overflow-hidden"
        >
          <InboxContent
            renderNotification={(notification) => (
              <div className="relative grid gap-8 p-7">
                <div
                  onClick={notification.isRead ? () => {} : notification.read}
                  className="relative -m-3 flex cursor-pointer rounded-lg p-2 pr-8 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-800"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={notification.avatar || "/lalala.svg"} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 space-y-1 sm:ml-4">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                      Lalala Notification
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                      {notification.body}
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-400">
                      {formatDistanceToNowStrict(
                        new Date(notification.createdAt),
                        {
                          addSuffix: true,
                        }
                      )}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <span className="absolute right-1 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-blue-500"></span>
                  )}
                </div>
              </div>
            )}
          />
        </PopoverContent>
      </Popover>
    </Inbox>
  );
};

export default Notification;
