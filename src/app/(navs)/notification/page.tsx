import dynamic from "next/dynamic";

const NotificationFeature = dynamic(() => import("@/features/notification"));
const NotificationPage = () => {
  return <NotificationFeature />;
};

export default NotificationPage;
