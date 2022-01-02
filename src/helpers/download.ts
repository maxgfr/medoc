import RNFetchBlob from 'rn-fetch-blob';
import {Buffer} from 'buffer';

export const downloadFile = (
  url: string,
  notifier?: (received: number, total: number) => void,
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    let imagePath: any = '';
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', url)
      .progress((received, total) => {
        if (notifier) {
          notifier(received, total);
        }
      })
      .then(resp => {
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(base64 => {
        try {
          const buffer = Buffer.from(base64, 'base64');
          RNFetchBlob.fs.unlink(imagePath);
          resolve(buffer);
        } catch (e) {
          reject(e);
        }
      })
      .catch(err => reject(err));
  });
};
