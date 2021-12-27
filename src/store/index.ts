import create, {SetState} from 'zustand';
import {Config} from '../config';
import {downloadUrl, storeAsync, txtConverter, txtToJson} from '../helpers';
import PQueue from 'p-queue/dist';

type AppStore = {
  data: Array<{url: string; result: Array<Record<string, any>>; name: string}>;
  downloadAll: () => void;
  numDownloaded: number;
};

const useStore = create((set: SetState<AppStore>) => ({
  downloadStatus: [],
  downloadAll: () => {
    const queue = new PQueue({concurrency: 1});
    Config.downloadUrl.forEach(async ({url, header, isForDownload, name}) => {
      if (isForDownload) {
        await queue.add(async () => {
          const downloadedText = await downloadUrl(url);
          const json = await txtToJson(header, txtConverter(downloadedText));
          await storeAsync(name, json);
          set(state => ({
            ...state,
            numDownloaded: state.numDownloaded + 1,
          }));
        });
      }
    });
  },
}));

export default useStore;
