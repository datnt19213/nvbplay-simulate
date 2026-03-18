import { getSettings } from "@/providers/action";
import { Setting } from "@/types/settings";

export class SettingsService {
  private static instance: SettingsService | null = null;
  private serverSettings: Setting[] | null = null;
  private clientSettings: Setting[] | null = null;

  private constructor() {}

  public static getInstance(): SettingsService {
    if (!this.instance) {
      this.instance = new SettingsService();
    }
    return this.instance;
  }

  public async initializeServer(
    settingsFetcher: () => Promise<Setting[]> = async () => {
      const settings = await getSettings();
      return settings.data.data;
    }
  ): Promise<void> {
    if (this.serverSettings) return;

    try {
      this.serverSettings = await settingsFetcher();
      this.setClientSettings(this.serverSettings);
    } catch (error) {
      console.error("Failed to initialize server settings:", error);
      this.serverSettings = null;
    }
  }

  public setClientSettings(settings: Setting[] | null): void {
    this.clientSettings = settings;
    console.log("Client Settings initialized: ", settings);
  }

  public get(key: string) {
    const isServer = typeof window === "undefined";
    const settings = isServer ? this.serverSettings : this.clientSettings;

    if (!settings || !Array.isArray(settings)) {
      return null;
    }

    const keys = key.split(".");
    for (const obj of settings) {
      let tempValue: any = obj;
      for (const k of keys) {
        tempValue = tempValue ? tempValue[k] : null;
        if (tempValue === null) break;
      }

      if (tempValue && typeof tempValue.value === "string") {
        return tempValue.value;
      }
    }

    return null;
  }

  public getObject(key: string) {
    const isServer = typeof window === "undefined";
    const settings = isServer ? this.serverSettings : this.clientSettings;

    if (!settings || !Array.isArray(settings)) {
      return null;
    }

    const keys = key.split(".");
    for (const obj of settings) {
      let tempValue: any = obj;
      for (const k of keys) {
        tempValue = tempValue ? tempValue[k] : null;
        if (tempValue === null) break;
      }

      if (tempValue) {
        return tempValue;
      }
    }

    return null;
  }
}

const settingsServiceInstance = SettingsService.getInstance();

export default settingsServiceInstance;
