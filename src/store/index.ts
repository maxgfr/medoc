import create, {GetState, SetState} from 'zustand';
import {Config, FileName} from '../config';
import {
  clearAllAsync,
  downloadFile,
  getAsync,
  removeDuplicateObject,
  storeAsync,
  txtConverter,
  txtToArrJson,
} from '../helpers';
import PQueue from 'p-queue/dist';
import Fuse from 'fuse.js';

type AppStore = {
  downloadAll: () => void;
  numDownloaded: number;
  searchAll: (cis: string) => void;
  allResult: Array<Record<string, any>>;
  searchByCollection: (string: string, value: FileName) => void;
  resultByCollection: Array<Record<string, any>>;
  fuse: Array<{index: string; fuse: any}>;
  restoreSearch: () => void;
  searchIsReady: boolean;
  clear: () => void;
};

const useStore = create<AppStore>(
  (set: SetState<AppStore>, get: GetState<AppStore>) => ({
    numDownloaded: 0,
    allResult: [],
    resultByCollection: [],
    fuse: [],
    searchIsReady: false,
    downloadAll: () => {
      const queue = new PQueue({concurrency: 1});
      Config.downloadUrl.forEach(
        async ({url, header, isForDownload, name, searchIndexes}) => {
          if (isForDownload) {
            await queue.add(async () => {
              const file = await downloadFile(url);
              const json = await txtToArrJson(header, txtConverter(file));
              if (searchIndexes) {
                const fuseIndex = Fuse.createIndex(searchIndexes.keys, json);
                await storeAsync(`${name}_INDEX`, fuseIndex);
                const fuse = new Fuse(json, searchIndexes, fuseIndex);
                set(state => ({
                  ...state,
                  fuse: removeDuplicateObject(
                    [
                      ...state.fuse,
                      {
                        index: name,
                        fuse,
                      },
                    ],
                    'index',
                  ),
                }));
              }
              await storeAsync(name, json);
              set(state => ({
                ...state,
                numDownloaded: state.numDownloaded + 1,
              }));
            });
          }
        },
      );
    },
    restoreSearch: () => {
      set(state => ({
        ...state,
        searchIsReady: false,
      }));
      const queue = new PQueue({concurrency: 1});
      Config.downloadUrl.forEach(async ({name, searchIndexes}) => {
        if (searchIndexes) {
          await queue.add(async () => {
            const saveIndex = await getAsync(`${name}_INDEX`);
            const saveData = await getAsync(name);
            const fuseIndex = Fuse.parseIndex(saveIndex);
            const fuse = new Fuse(
              saveData as Array<Record<string, any>>,
              searchIndexes,
              fuseIndex,
            );
            set(state => ({
              ...state,
              fuse: removeDuplicateObject(
                [
                  ...state.fuse,
                  {
                    index: name,
                    fuse,
                  },
                ],
                'index',
              ),
            }));
          });
        }
      });
      set(state => ({
        ...state,
        searchIsReady: true,
      }));
    },
    searchAll: (search: string) => {
      const result: Array<Record<string, any>> = [];
      get().fuse.forEach(({fuse, index}) => {
        result.push({index, result: fuse.search(search)});
      });
      set(state => ({
        ...state,
        allResult: result,
      }));
    },
    searchByCollection: (search: string, name: FileName) => {
      let result: Array<Record<string, any>> = [];
      get().fuse.forEach(({fuse, index}) => {
        if (index === name) {
          result = fuse.search(search);
        }
      });
      set(state => ({
        ...state,
        resultByCollection: result,
      }));
    },
    clear: async () => {
      await clearAllAsync();
      set(state => ({
        ...state,
        numDownloaded: 0,
        allResult: [],
        resultByCollection: [],
        fuse: [],
        searchIsReady: false,
      }));
    },
  }),
);

export default useStore;
