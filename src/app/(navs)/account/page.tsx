import dynamic from "next/dynamic";

const AccountFeature = dynamic(() =>
  import("@/features/account").then((com) => com.default)
);
const AccountPage = () => {
  return <AccountFeature />;
};

export default AccountPage;
