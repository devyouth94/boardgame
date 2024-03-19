import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

import type { RoomStore } from "~/entities/rooms/model/rooms.schema";

const useRoomStore = create<RoomStore>((set) => ({
  room: undefined,
  actions: {
    onInsertRoomInfo: (room) => {
      set(() => ({ room }));
    },
    onChangeRoomInfo: (room) => {
      set((state) => ({ room: { ...state.room!, ...room } }));
    },
    onResetRoomInfo: () => {
      set(() => ({ room: undefined }));
    },
  },
}));

export const useRoomState = () => useRoomStore(useShallow(({ room }) => room));
export const useRoomActions = () => useRoomStore(({ actions }) => actions);
