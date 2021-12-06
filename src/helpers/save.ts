import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeAsync(
  key: string,
  value: Record<string, any>,
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

export async function getAsync(key: string): Promise<Record<string, any>> {
  return new Promise(async (resolve, reject) => {
    try {
      const v = await AsyncStorage.getItem(key);
      if (v) {
        resolve(JSON.parse(v));
      }
      reject();
    } catch (e) {
      reject(e);
    }
  });
}

export async function removeAsync(key: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.removeItem(key);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

export async function clearAllAsync(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.clear();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
