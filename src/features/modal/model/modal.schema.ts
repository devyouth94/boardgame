import type { ComponentProps, FunctionComponent } from "react";

interface Instance {
  Component: FunctionComponent<any>;
  props: ComponentProps<FunctionComponent>;
}

interface State {
  modalMap: Map<FunctionComponent<any>, Instance>;
}

interface Action {
  actions: {
    onOpenModal: <T extends FunctionComponent<any>>(
      Component: T,
      props?: Omit<ComponentProps<T>, "open" | "onClose">,
    ) => void;
    onCloseModal: <T extends FunctionComponent<any>>(Component: T) => void;
    onCleanModal: <T extends FunctionComponent<any>>(Component: T) => void;
    onResetModal: () => void;
  };
}

export interface ModalStore extends State, Action {}

export type ModalProps<Props extends object = object> = {
  open: boolean;
  onClose: () => void;
} & Props;
