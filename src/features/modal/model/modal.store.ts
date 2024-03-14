import { create } from "zustand";

import { ModalStore } from "~/features/modal/model/modal.schema";

const useModalStore = create<ModalStore>((set) => ({
  modalMap: new Map(),
  actions: {
    onOpenModal: (Component, props) => {
      set(({ modalMap }) => {
        modalMap.set(Component, { Component, props: { ...props, open: true } });
        return { modalMap: new Map(modalMap) };
      });
    },
    onCloseModal: (Component) => {
      set(({ modalMap }) => {
        const instance = modalMap.get(Component);
        if (instance) {
          modalMap.set(Component, { ...instance, props: { ...instance.props, open: false } });
        }
        return { modalMap: new Map(modalMap) };
      });
    },
    onCleanModal: (Component) => {
      set(({ modalMap }) => {
        modalMap.delete(Component);
        return { modalMap: new Map(modalMap) };
      });
    },
    onResetModal: () => {
      set(() => ({ modalMap: new Map() }));
    },
  },
}));

export const useModalState = () => useModalStore((state) => state.modalMap);
export const useModalActions = () => useModalStore((state) => state.actions);
