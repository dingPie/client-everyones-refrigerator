import AsyncStorage from '@react-native-async-storage/async-storage';

export function getAsyncStorage<T>(key: string): T | null;
export function getAsyncStorage<T>(key: string, defaultValue: T): T;
export async function getAsyncStorage(key: string, defaultValue = null) {
  const value = await AsyncStorage.getItem(key);
  if (!value) return defaultValue;
  return JSON.parse(value);
}

export const setAsyncStorage = async <T = any>(
  key: string,
  value: T,
  defaultValue?: T,
) => {
  await AsyncStorage.setItem(key, JSON.stringify(value || defaultValue));
};

export const removeAsyncStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
