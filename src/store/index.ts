import create, {SetState} from 'zustand';
import {Config} from '../config';
import {downloadUrl, storeAsync, txtConverter, txtToArrJson} from '../helpers';
import PQueue from 'p-queue/dist';
import Fuse from 'fuse.js';

type AppStore = {
  downloadAll: () => void;
  numDownloaded: number;
  search: (search: string) => void;
  searchResult: Array<Record<string, any>>;
};

const useStore = create((set: SetState<AppStore>) => ({
  downloadAll: () => {
    const queue = new PQueue({concurrency: 1});
    Config.downloadUrl.forEach(
      async ({url, header, isForDownload, name, searchIndexes}) => {
        if (isForDownload) {
          await queue.add(async () => {
            const downloadedText = await downloadUrl(url);
            const json = await txtToArrJson(
              header,
              txtConverter(downloadedText),
            );
            if (searchIndexes) {
              const fuseIndex = Fuse.createIndex(searchIndexes.keys, json);
              await storeAsync(`${name}_INDEX`, fuseIndex);
            }
            await storeAsync(name, json);
            console.log(json);
            set(state => ({
              ...state,
              numDownloaded: state.numDownloaded + 1,
            }));
          });
        }
      },
    );
  },
  search: (search: string) => {
    // initialize Fuse with the index
    // const fuse = new Fuse(json, options, myIndex);
    // console.log(fuse.search(search));

    //     const myIndex = Fuse.parseIndex(fuseIndex)
    // // initialize Fuse with the index
    // const fuse = new Fuse(books, options, myIndex)

    set(state => ({
      ...state,
      searchResult: [],
    }));
  },
}));

export default useStore;
