"use client";
import IconCustom from "@/components/common-components/icon-custom";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import {
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";
import { formatDistanceToNowStrict } from "date-fns";
import { useSelector } from "react-redux";
import Image from "@/components/base-components/images/image";
import { badge_logo } from "@/assets/icons";
import { GlobalKeys } from "@/services/globals";
import { getGlobalKey } from "@/services/globals";
type NotificationProps = {
  icon: string;
  name: string;
};
const NovuCenter = ({ icon, name }: NotificationProps) => {
  const user = useSelector((state: RootState) => state.users_data.user);

  return (
    <NovuProvider
      applicationIdentifier={getGlobalKey(GlobalKeys.NOVU_APP_INDEN) || ""}
      subscriberId={user?.id || ""}
    >
      <PopoverNotificationCenter
        offset={20}
        colorScheme={"light"}
        showUserPreferences={false}
        listItem={(notification, handleNotificationClick) => (
          <NotificationCustom
            notification={notification}
            handleNotificationClick={handleNotificationClick}
          />
        )}
      >
        {({ unseenCount }) => (
          <BellCustom unreadCount={unseenCount || 0} icon={icon} name={name} />
        )}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};

export default NovuCenter;

const BellCustom = ({
  unreadCount,
  icon,
  name,
}: {
  unreadCount: number;
  icon: string;
  name: string;
}) => {
  return (
    <div className="flex items-center gap-2 text-white hover:text-primary transition-colors duration-200 cursor-pointer">
      <div className="size-5 relative">
        <IconCustom icon={icon} className="size-5 z-0" />
        {Number(unreadCount) > 0 && (
          <p className="p-1 pt-1 size-[18px] rounded-full bg-red-500 text-white absolute -top-1.5 -right-1.5 flex items-center justify-center text-[10px]">
            {unreadCount}
          </p>
        )}
      </div>
      {name}
    </div>
  );
};

const NotificationCustom = ({
  notification,
  handleNotificationClick,
}: {
  notification: any;
  handleNotificationClick: any;
}) => {
  const handleNotificationClicked = (): void => {
    handleNotificationClick && handleNotificationClick();
  };
  return (
    <div
      //   onClick={() => handleNotificationClicked()}
      className="flex w-full min-w-full items-start justify-between gap-3"
    >
      <div
        className={cn(
          "p-4 flex flex-1 items-start justify-between gap-3 cursor-pointer bg-transparent hover:bg-gray-100",
          {
            "bg-[#F5F5FA]": !notification.read,
          }
        )}
      >
        <div className="flex justify-center items-start gap-2">
          <div className="size-12 aspect-square">
            <Image src={badge_logo.src} className="rounded-lg " />
          </div>
          <div className="flex flex-col max-w-[220px]">
            <h5 className="text-sm font-semibold leading-5">
              {notification?.payload?.customTittle || "Thông báo đơn hàng"}
            </h5>
            <p className="text-xs leading-[18px ] text-muted-foreground">
              {notification?.payload?.customMessage || ""}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full items-end w-[5rem]">
          <p className="text-[11px] text-muted-foreground">
            {formatDistanceToNowStrict(notification.createdAt)}
          </p>
          {!notification.read && (
            <div className="size-2 bg-blue-600 rounded-full animate-pulse" />
          )}
          <div />
        </div>
      </div>
    </div>
  );
};
