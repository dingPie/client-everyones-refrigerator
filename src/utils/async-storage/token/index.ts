import {
  getAsyncStorage,
  removeAsyncStorage,
  setAsyncStorage,
} from '../helper';

const TOKEN_KEY = '@token';

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export const getToken = async () => {
  const token = getAsyncStorage<TokenType>(TOKEN_KEY);
  return token;
};

export const setToken = async (token: TokenType) => {
  await setAsyncStorage(TOKEN_KEY, token);
};

export const deleteToken = async () => {
  await removeAsyncStorage(TOKEN_KEY);
};
