import create, {GetState, SetState} from 'zustand';
import {Config, FileName, StorageKey} from '../config';
import {
  clearAllAsync,
  downloadFile,
  getAsync,
  removeDuplicateObject,
  storeAsync,
  bufferToText,
  txtToArrJson,
} from '../helpers';
import PQueue from 'p-queue/dist';
import Fuse from 'fuse.js';

type ArrayOfResults = Array<{
  index: FileName;
  values: Array<Record<string, any>>;
}>;

type HistoricItem = {
  cis: string;
  name: string;
};

type LatestUpdate = {
  date: string;
};

type AppInitialState = {
  allResult: Array<Record<string, any>>;
  fuse: Array<{index: string; fuse: any}>;
  objects: ArrayOfResults;
  searchIsReady: boolean;
  cisResult: ArrayOfResults;
  progress: number;
  historic: Array<HistoricItem>;
  lastUpdate: string;
};

type AppStore = {
  downloadAll: () => void;
  searchAll: (search: string) => void;
  searchByCis: (search: string) => void;
  searchByCip13: (search: string) => void;
  restoreSearch: () => void;
  clear: () => void;
  getHistoric: () => void;
  getLatestUpdate: () => void;
  initSearch: () => void;
} & AppInitialState;

const initialState: AppInitialState = {
  allResult: [],
  fuse: [],
  objects: [],
  searchIsReady: false,
  cisResult: [],
  progress: 0,
  historic: [],
  lastUpdate: new Date().toLocaleDateString('fr-FR'),
};

const useStore = create<AppStore>(
  (set: SetState<AppStore>, get: GetState<AppStore>) => ({
    ...initialState,
    initSearch: () => {
      set(state => ({
        ...state,
        allResult: [],
      }));
    },
    downloadAll: async () => {
      set(state => ({
        ...state,
        searchIsReady: false,
        fuse: [],
        objects: [],
        progress: 0,
      }));
      await clearAllAsync();
      const queue = new PQueue({concurrency: 1});
      const numberOfDownloadFiles = Config.downloadUrl.reduce(
        (acc, cur) => (cur.isForDownload ? acc + 1 : acc),
        0,
      );
      Config.downloadUrl.forEach(
        async ({url, header, isForDownload, name, searchIndexes}) => {
          if (isForDownload) {
            await queue.add(async () => {
              const file = await downloadFile(url);
              const json = await txtToArrJson(header, bufferToText(file));
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
                progress: parseFloat(
                  (state.progress + 100 / numberOfDownloadFiles).toFixed(2),
                ),
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
            });
          }
        },
      );
      await queue.onIdle();
      await storeAsync<LatestUpdate>(StorageKey.DB, {
        date: new Date().toLocaleDateString('fr-FR'),
      });
      set(state => ({
        ...state,
        searchIsReady: true,
        progress: 100,
        lastUpdate: new Date().toLocaleDateString('fr-FR'),
      }));
    },
    restoreSearch: async () => {
      set(state => ({
        ...state,
        searchIsReady: false,
        fuse: [],
        objects: [],
        progress: 0,
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
      await queue.onIdle();
      set(state => ({
        ...state,
        searchIsReady: true,
        progress: 100,
      }));
    },
    searchAll: (search: string) => {
      let result: Array<Record<string, any>> = [];
      get().fuse.forEach(({fuse}) => {
        result = [...result, ...fuse.search(search, {limit: 25})];
      });
      result = result.sort((a, b) =>
        a.score < b.score ? -1 : a.score > b.score ? 1 : 0,
      );
      set(state => ({
        ...state,
        allResult: result,
      }));
    },
    searchByCis: async (search: string) => {
      let res: ArrayOfResults = [];
      let foundItem: HistoricItem | undefined;
      get().objects.forEach(({index, values}) => {
        if (index === FileName.CIS_bdpm) {
          const find = values.find(v => v.cis === search);
          if (find) {
            foundItem = {name: find?.denomination_medicament, cis: find?.cis};
          }
        }
        res = [
          ...res,
          {index, values: values?.filter(item => item.cis === search) ?? []},
        ];
      });
      let historic: Array<HistoricItem> = get().historic;
      if (foundItem) {
        historic = historic.find(v => v.cis === foundItem?.cis)
          ? historic
          : [foundItem, ...historic.slice(0, 10)];
        await storeAsync<Array<HistoricItem>>(StorageKey.HISTORIC, historic);
      }
      set(state => ({
        ...state,
        cisResult: res,
        historic,
      }));
    },
    searchByCip13: async (search: string) => {
      let res: ArrayOfResults = [];
      let cipResult: Record<string, any> | undefined;
      let foundItem: HistoricItem | undefined;
      get().objects.forEach(({index, values}) => {
        if (index === FileName.CIS_CIP_bdpm) {
          cipResult = values.find(item => item.cip13 === search);
          if (cipResult) {
            get().objects.forEach(item => {
              if (item.index === FileName.CIS_bdpm) {
                const find = item.values.find(v => v.cis === cipResult?.cis);
                if (find) {
                  foundItem = {
                    name: find?.denomination_medicament,
                    cis: find?.cis,
                  };
                }
              }
              res = [
                ...res,
                {
                  index: item.index,
                  values:
                    item.values?.filter(v => v.cis === cipResult?.cis) ?? [],
                },
              ];
            });
          }
        }
      });
      let historic: Array<HistoricItem> = get().historic;
      if (foundItem) {
        historic = historic.find(v => v.cis === foundItem?.cis)
          ? historic
          : [foundItem, ...historic.slice(0, 10)];
        await storeAsync<Array<HistoricItem>>(StorageKey.HISTORIC, historic);
      }
      set(state => ({
        ...state,
        cisResult: res,
        historic,
      }));
    },
    clear: async () => {
      await clearAllAsync();
      set(initialState);
    },
    getHistoric: async () => {
      getAsync<Array<HistoricItem>>(StorageKey.HISTORIC).then(historic => {
        set(state => ({
          ...state,
          historic: historic ?? [],
        }));
      });
    },
    getLatestUpdate: async () => {
      getAsync<LatestUpdate>(StorageKey.DB).then(v => {
        set(state => ({
          ...state,
          lastUpdate: v.date,
        }));
      });
    },
  }),
);

export default useStore;
