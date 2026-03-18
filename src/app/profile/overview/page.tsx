import ComingSoon from "@/components/base-components/cta/coming-soon";
import {DetailOverview, WelcomeOverview} from "@/features/profile-overview";
import React from "react";

const Overview = () => {
  return (
    <div className="w-full py-4 flex flex-col gap-3">
      <WelcomeOverview />
      <DetailOverview />
    </div>
  );
};

export default Overview;
