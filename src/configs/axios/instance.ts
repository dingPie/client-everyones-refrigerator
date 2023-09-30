import axios, { AxiosError } from 'axios';

import { deleteToken, getToken } from '@/utils/async-storage/token';
import { apiLogger } from '@/utils/logger/api-logger';
import styledConsole from '@/utils/logger/styled-console';

import { ENV } from '../env';
import { refresh } from './refresh';

const isDev = ENV.NODE_ENV === 'development';

const instance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    const isAccess = !!token && !!token.accessToken;
    if (isAccess) {
      config.headers.setAuthorization(`Bearer ${token.accessToken}`);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    const { status, config: reqData, data: resData } = res;
    if (isDev) apiLogger({ status, reqData, resData });
    return res;
  },
  async (error: AxiosError) => {
    try {
      const { response: res, config: reqData } = error || {};
      const { status } = res || { status: 400 };
      const isUnAuthError = status === 429;
      const isExpiredToken = status === 419;

      if (isDev)
        apiLogger({ status, reqData, resData: error, method: 'error' });

      if (isExpiredToken) {
        return refresh(reqData);
      }

      if (isUnAuthError) {
        deleteToken();
        // P_TODO: 리프레시 만료 되었을 때 어떻게하지?
      }

      return Promise.reject(error);
    } catch (e) {
      styledConsole({
        method: 'error',
        topic: 'UN_HANDLED',
        title: 'axios-interceptor',
        data: e,
      });
    }
  },
);

export default instance;
