import SettingProvider from "./setting-provider";
import { getSettings } from "./action";

const SettingProviderContainer = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Fetch settings and store them in a variable
  const settingsResponse = await getSettings();
  const system = settingsResponse.data.data;

  // Directly pass the fetched settings to the provider
  return (
    <SettingProvider initialSettings={system}>
      {children}
    </SettingProvider>
  );
};

export default SettingProviderContainer;
