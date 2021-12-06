import create, {SetState} from 'zustand';

type AppStore = {
  bears: number;
};

const useStore = create((set: SetState<AppStore>) => ({
  bears: 0,
  increasePopulation: () =>
    set((state: AppStore) => ({bears: state.bears + 1})),
  removeAllBears: () => set({bears: 0}),
}));

export default useStore;
