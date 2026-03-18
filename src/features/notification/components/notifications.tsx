"use client";

import { badge_logo, bell } from "@/assets/icons";
import Image from "@/components/base-components/images/image";
import { Icon } from "@/components/common-components";
import { cn } from "@/lib/utils";
import {
  IMessage,
  useMarkNotificationsAs,
  useNotifications
} from "@novu/notification-center";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect } from "react";

const Notifications = () => {
  // const router = useRouter();

  // Notification
  const { notifications, fetchNextPage, refetch } = useNotifications();
  const { markNotificationsAs } = useMarkNotificationsAs();

  // Handler
  useEffect(() => {
    refetch();
    fetchNextPage();
  }, [notifications]);

  const handleNotificationClicked = (notification: IMessage): void => {
    markNotificationsAs({
      messageId: notification?._id,
      read: true,
      seen: true,
    });
    // notification?.payload?.reservation_id &&
    //   router.push("/reservation/" + notification?.payload?.reservation_id);
  };

  const handleMarkAllNotificationsAsRead = () => {
    markNotificationsAs({
      messageId: "",
      read: true,
      seen: true,
    });
  };

  return (
    <div className="pb-16">
      <div className="p-4 flex justify-between items-center">
        <p className="text-lg font-medium">Thông báo</p>
        <p
          className={cn(
            "flex items-center gap-2 cursor-pointer text-blue-500",
            {
              "text-muted-foreground/50": notifications?.length <= 0,
            }
          )}
          onClick={handleMarkAllNotificationsAsRead}
        >
          <Icon icon="line-md:check-all" className={cn("size-5")} />
          <span className="text-sm">Đánh dấu đã đọc</span>
        </p>
      </div>

      <div className="desktop:h-[21rem] grid grid-cols-1 overflow-y-scroll scrollbar-none overflow-hidden">
        <>
          {notifications?.length > 0 ? (
            <>
              {notifications.map((noti, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      "p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-gray-100",
                      {
                        "bg-[#F5F5FA]": !noti.read,
                      }
                    )}
                    onClick={() => handleNotificationClicked(noti)}
                  >
                    <div className="flex justify-center items-start gap-2">
                      <div className="size-12 aspect-square">
                        <Image src={badge_logo.src} className="rounded-lg " />
                      </div>
                      <div className="flex flex-col max-w-[220px]">
                        <h5 className="text-sm font-semibold leading-5">
                          {(noti?.payload?.customTittle?.toString() as string) ||
                            "Thông báo đơn hàng"}
                        </h5>
                        <p className="text-xs leading-[18px ] text-muted-foreground">
                          {(noti?.payload?.customMessage?.toString() as string) ||
                            ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-start gap-1 h-full items-end w-[5rem]">
                      <p className="text-[11px] text-right text-muted-foreground">
                        {formatDistanceToNowStrict(new Date(noti?.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                      {!noti.read && (
                        <div className="size-2 bg-blue-600 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 pb-5">
              <Image src={bell.src} className="max-w-[274px]" />
              <p className="text-sm font-medium">Không có thông báo mới</p>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Notifications;
