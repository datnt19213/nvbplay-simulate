"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAblyChannel } from "@/utilities/ably";
import { Setting } from "@/types/settings";
import settingsServiceInstance from "@/services/settings";
import PopupFirstRender from "@/components/common-components/popup";

interface SettingProviderProps {
  children: React.ReactNode;
  initialSettings?: Setting[] | null;
}

interface SettingsContextValue {
  settings: Setting[] | null;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined
);

const SettingProvider = ({
  children,
  initialSettings = null,
}: SettingProviderProps) => {
  const [settings, setSettings] = useState<Setting[] | null>(initialSettings);

  useEffect(() => {
    settingsServiceInstance.setClientSettings(initialSettings);
  }, [initialSettings]);

  useEffect(() => {
    const channel = getAblyChannel("setting_updated");

    const handleNewMessage = (message: any) => {
      const newSetting = message.data;
      setSettings(newSetting);
    };

    channel.subscribe("setting_updated", handleNewMessage);

    return () => {
      channel.unsubscribe("setting_updated", handleNewMessage);
    };
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
      }}
    >
      {initialSettings && <PopupFirstRender />}
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingProvider");
  }
  return {
    settings: context.settings,
  };
};

export default SettingProvider;
