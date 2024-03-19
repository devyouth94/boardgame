import { create } from "zustand";

import { PlayerStore } from "~/entities/players/model/players.schema";

const usePlayerStore = create<PlayerStore>((set) => ({
  playerMap: undefined,
  actions: {
    onInsertPlayerMap: (playerMap) => {
      set(() => ({ playerMap }));
    },
    onChangePlayerMap: (updateFunc) => {
      set(({ playerMap }) => ({ playerMap: updateFunc(playerMap) }));
    },
    onClearPlayerMap: () => {
      set(() => ({ playerMap: undefined }));
    },
  },
}));

export const usePlayerState = () => usePlayerStore(({ playerMap }) => playerMap);
export const usePlayerActions = () => usePlayerStore(({ actions }) => actions);
