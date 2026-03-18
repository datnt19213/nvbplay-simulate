import settingsServiceInstance from "../settings";

export enum GlobalKeys {
  API_URL = "system.enviroment.api-url",
  PROVIDER_PAYMENT_ID = "system.enviroment.provider-payment-id",
  NOVU_SECRET_KEY = "system.enviroment.novu-secret-key",
  NOVU_APP_INDEN = "system.enviroment.novu-app-inden",
  NOVU_ENV_KEY = "system.enviroment.novu-env-key",
  BLOG_API_URL = "system.enviroment.blog-api-url",
  USER_ID = "system.enviroment.user-id",
  CHANNEL_ID = "system.enviroment.channel-id",
  CONTENT_MODEL_ID = "system.enviroment.content-model-id",
  SALE_CHANNEL_ID = "system.enviroment.sale-channel-id",
  CALLBACK_URL = "system.enviroment.callback-url",
  ABLY_KEY = "system.enviroment.ably-key",
  PUBLISH_API_KEY = "system.enviroment.publish-api-key",
  REGION_ID = "system.enviroment.region-id",
}

export const getGlobalKey = (key: GlobalKeys | string) => {
  return settingsServiceInstance.get(key);
};

export const getGlobalObject = (key: GlobalKeys | string): any => {
  return settingsServiceInstance.getObject(key);
};
