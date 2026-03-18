"use client";

import React, { useState } from "react";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
}

const TabsUI: React.FC<TabsProps> = ({ tabs, defaultTabId }) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full">
      <div className="flex border-b bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 flex-1 text-sm font-medium transition-colors duration-200 border-b-2 focus:outline-none
              ${
                activeTab === tab.id
                  ? "text-txtthird border-txtthird"
                  : "text-gray-icon border-transparent hover:text-txtthird"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-[16px] mt-[12px] bg-white rounded-[8px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`transition-opacity duration-300 ${activeTab === tab.id ? "opacity-100" : "hidden"}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsUI;
