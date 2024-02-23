import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
  data: boolean;
}

interface Actions {
  actions: {
    setData: () => void;
  };
}

interface Store extends State, Actions {}

const useIndexStore = create<Store>()(
  immer((set) => ({
    data: false,
    actions: {
      setData: () => {
        set((state) => {
          state.data = !state.data;
        });
      },
    },
  })),
);

export const useIndexState = () => useIndexStore((state) => state.data);
export const useIndexActions = () => useIndexStore((state) => state.actions);
