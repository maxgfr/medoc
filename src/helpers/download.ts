import RNFetchBlob from 'rn-fetch-blob';

export const downloadUrl = (
  url: string,
  notifier?: (received: number, total: number) => void,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    RNFetchBlob.fetch('GET', url)
      .progress((received, total) => {
        if (notifier) {
          notifier(received, total);
        }
      })
      .then(response => {
        resolve(response.text());
      })
      .catch(err => reject(err));
  });
};
