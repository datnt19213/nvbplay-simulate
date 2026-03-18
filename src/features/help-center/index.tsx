import React from "react";
import { HelpCenterBanner } from "./components/banner";
import { SupportInfo } from "./components/support-info";
import { Categories } from "./components/categories";
import { RecentlyQuestions } from "./components/recently-questions";

export const HelpCenterFeature = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="block h-[26.25rem]">
        <HelpCenterBanner />
      </div>
      <div className="block mb-4">
        <SupportInfo />

        <Categories type="list" className="p-4" />

        <RecentlyQuestions />
      </div>
    </div>
  );
};
