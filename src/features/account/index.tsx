import { COMMON_DATA } from "@/configs";
import LoyaltyCard from "./components/loyalty-card";
import NavLinks from "./components/nav-links";
import UserCard from "./components/user-card";

const AccountFeatures = () => {
  return (
    <div className="pb-10">
      <UserCard />
      <div className="p-4 border-b border-gray-100">
        <LoyaltyCard />
      </div>
      <NavLinks data={COMMON_DATA.header.user_buttons} showDetails />
    </div>
  );
};

export default AccountFeatures;
