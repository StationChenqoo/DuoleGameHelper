import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';

interface States {
  bears: number;
  increase: (by: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  lastCachedBaohuangWeifangPlayers: any[];
  setLastCachedBaohuangWeifangPlayers: (
    lastCachedBaohuangWeifangPlayers: any[],
  ) => void;
}

const useStore = create<States>()(
  devtools(
    persist(
      set => ({
        bears: 0,
        increase: by => set(state => ({bears: state.bears + by})),
        theme: '#987123',
        setTheme: theme => set({theme}),
        lastCachedBaohuangWeifangPlayers: [],
        setLastCachedBaohuangWeifangPlayers: lastCachedBaohuangWeifangPlayers =>
          set({lastCachedBaohuangWeifangPlayers}),
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: 'useStore.ts',
        /** 白名单 */
        partialize: state => ({
          bears: state.bears,
          theme: state.theme,
        }),
      },
    ),
  ),
);

export {useStore};
