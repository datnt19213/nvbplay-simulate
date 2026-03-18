"use client";

import { RootState } from "@/stores";
import { NovuProvider } from "@novu/notification-center";
import { useSelector } from "react-redux";
import Notifications from "./notifications";
import { GlobalKeys } from "@/services/globals";
import { getGlobalKey } from "@/services/globals";

export const MobileNovuNotificationWrapper = () => {
  const user = useSelector((state: RootState) => state.users_data.user);

  return (
    <NovuProvider
      applicationIdentifier={getGlobalKey(GlobalKeys.NOVU_APP_INDEN) || ""}
      subscriberId={user?.currentUser?.id || ""}
      initialFetchingStrategy={{
        fetchUnseenCount: true,
        fetchOrganization: true,
        fetchNotifications: true,
        fetchUserPreferences: true,
      }}
    >
      <Notifications />
    </NovuProvider>
  );
};
