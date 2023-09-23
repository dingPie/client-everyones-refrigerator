import Config from 'react-native-config';

export const ENV = {
  /** For App */
  APP_NAME: Config.APP_DISPLAY_NAME,
  APP_VERSION_CODE: Config.APP_VERSION_CODE,
  APP_VERSION_NAME: Config.APP_VERSION_NAME,

  NODE_ENV: Config.NODE_ENV,
  API_BASE_URL: Config.API_BASE_URL,
} as const;
