import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeAsync(
  key: string,
  data: Record<string, any> | Array<Record<string, any>>,
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const store = JSON.stringify(data).match(/.{1,1000000}/g);
      store?.forEach(async (part, index) => {
        await AsyncStorage.setItem(key + index, part);
      });
      await AsyncStorage.setItem(key, '' + store?.length);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export async function getAsync(
  key: string,
): Promise<Record<string, any> | Array<Record<string, any>>> {
  return new Promise(async (resolve, reject) => {
    try {
      let store = '';
      let numberOfParts = await AsyncStorage.getItem(key);
      if (typeof numberOfParts === 'undefined' || numberOfParts === null) {
        reject();
      } else {
        for (let i = 0; i < parseInt(numberOfParts, 10); i++) {
          store += await AsyncStorage.getItem(key + i);
        }
        if (store === '') {
          reject();
        }
        resolve(JSON.parse(store));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function removeAsync(key: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      let numberOfParts = await AsyncStorage.getItem(key);
      if (typeof numberOfParts !== 'undefined' && numberOfParts !== null) {
        for (let i = 0; i < parseInt(numberOfParts, 10); i++) {
          await AsyncStorage.removeItem(key + i);
        }
        await AsyncStorage.removeItem(key);
        resolve();
      }
      reject();
    } catch (error) {
      reject(error);
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
