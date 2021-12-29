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

type AppInitialState = {
  numDownloaded: number;
  allResult: Array<Record<string, any>>;
  fuse: Array<{index: string; fuse: any}>;
  objects: Array<{index: FileName; values: Array<Record<string, any>>}>;
  searchIsReady: boolean;
  cip13Result: Record<string, any>;
  cisResult: Array<{index: FileName; result: Record<string, any>}>;
};

type AppStore = {
  downloadAll: () => void;
  searchAll: (search: string) => void;
  searchByCis: (search: string) => void;
  searchByCip13: (search: string) => void;
  restoreSearch: () => void;
  clear: () => void;
} & AppInitialState;

const initialState: AppInitialState = {
  numDownloaded: 0,
  allResult: [],
  fuse: [],
  objects: [],
  searchIsReady: false,
  cip13Result: {},
  cisResult: [],
};

const useStore = create<AppStore>(
  (set: SetState<AppStore>, get: GetState<AppStore>) => ({
    ...initialState,
    downloadAll: async () => {
      await clearAllAsync();
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
                objects: removeDuplicateObject(
                  [
                    ...state.objects,
                    {
                      index: name,
                      values: json,
                    },
                  ],
                  'index',
                ),
              }));
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
        await queue.add(async () => {
          const saveData = await getAsync(name);
          set(state => ({
            ...state,
            objects: removeDuplicateObject(
              [
                ...state.objects,
                {
                  index: name,
                  values: saveData,
                },
              ],
              'index',
            ),
          }));
          if (searchIndexes) {
            const saveIndex = await getAsync(`${name}_INDEX`);
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
          }
        });
      });
      set(state => ({
        ...state,
        searchIsReady: true,
      }));
    },
    searchAll: (search: string) => {
      let result: Array<Record<string, any>> = [];
      get().fuse.forEach(({fuse}) => {
        result = [...result, ...fuse.search(search)];
      });
      result = result.sort((a, b) =>
        a.score < b.score ? -1 : a.score > b.score ? 1 : 0,
      );
      set(state => ({
        ...state,
        allResult: result,
      }));
    },
    searchByCis: (search: string) => {
      let res: Array<{index: FileName; result: Record<string, any>}> = [];
      get().objects.forEach(({index, values}) => {
        res = [
          ...res,
          {index, result: values.find(item => item.cis === search) ?? {}},
        ];
      });
      set(state => ({
        ...state,
        cisResult: res,
      }));
    },
    searchByCip13: (search: string) => {
      let result: Record<string, any> | undefined = {};
      get().objects.forEach(({index, values}) => {
        if (index === FileName.CIS_CIP_bdpm) {
          result = values.find(item => item.cip13 === search);
        }
      });
      set(state => ({
        ...state,
        cip13Result: result ?? {},
      }));
    },
    clear: async () => {
      await clearAllAsync();
      set(initialState);
    },
  }),
);

export default useStore;
