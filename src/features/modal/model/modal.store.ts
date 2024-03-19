import { create } from "zustand";

import { ModalStore } from "~/features/modal/model/modal.schema";

const useModalStore = create<ModalStore>((set) => ({
  modalMap: new Map(),
  actions: {
    onOpenModal: (Component, props) => {
      set(({ modalMap }) => {
        const newMap = new Map(modalMap);
        newMap.set(Component, { Component, props: { ...props, open: true } });

        return { modalMap: newMap };
      });
    },
    onCloseModal: (Component) => {
      set(({ modalMap }) => {
        const newMap = new Map(modalMap);
        const instance = newMap.get(Component);
        if (instance) {
          newMap.set(Component, { ...instance, props: { ...instance.props, open: false } });
        }

        return { modalMap: newMap };
      });
    },
    onCleanModal: (Component) => {
      set(({ modalMap }) => {
        const newMap = new Map(modalMap);
        newMap.delete(Component);

        return { modalMap: newMap };
      });
    },
    onResetModal: () => {
      set(() => ({ modalMap: new Map() }));
    },
  },
}));

export const useModalState = () => useModalStore((state) => state.modalMap);
export const useModalActions = () => useModalStore((state) => state.actions);
