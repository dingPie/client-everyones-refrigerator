import Config from 'react-native-config';

export const ENV = {
  /** For App */
  APP_NAME: Config.APP_DISPLAY_NAME,
  APP_VERSION_CODE: Config.APP_VERSION_CODE,
  APP_VERSION_NAME: Config.APP_VERSION_NAME,

  NODE_ENV: Config.NODE_ENV,
  DEV_API_BASE_URL: Config.DEV_API_BASE_URL,
  PROD_API_BASE_URL: Config.PROD_API_BASE_URL,
} as const;
