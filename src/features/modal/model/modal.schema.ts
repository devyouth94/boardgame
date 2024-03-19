import type { ComponentProps, FunctionComponent } from "react";

interface Instance {
  Component: FunctionComponent<any>;
  props: ComponentProps<FunctionComponent>;
}

type State = Map<Instance["Component"], Instance>;

interface Actions {
  onOpenModal: <T extends Instance["Component"]>(
    Component: T,
    props?: Omit<ComponentProps<T>, "open" | "onClose">,
  ) => void;
  onCloseModal: <T extends Instance["Component"]>(Component: T) => void;
  onCleanModal: <T extends Instance["Component"]>(Component: T) => void;
  onResetModal: () => void;
}

export interface ModalStore {
  modalMap: State;
  actions: Actions;
}

export type ModalProps<Props extends object = object> = {
  open: boolean;
  onClose: () => void;
} & Props;
