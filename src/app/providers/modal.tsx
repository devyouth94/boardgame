import { useEffect, type FunctionComponent } from "react";
import { useLocation } from "react-router-dom";

import { useModalActions, useModalState } from "~/features/modal/model/modal.store";

const ModalProvider = () => {
  const { pathname } = useLocation();

  const modalMap = useModalState();
  const { onCloseModal, onCleanModal, onResetModal } = useModalActions();

  const onClose = (component: FunctionComponent<any>) => {
    onCloseModal(component);

    setTimeout(() => {
      onCleanModal(component);
    }, 100);
  };

  useEffect(() => {
    if (!modalMap.size) return;

    onResetModal();
  }, [pathname]);

  return (
    <>
      {Array.from(modalMap.values()).map(({ Component, props }) => (
        <Component key={Component.name} onClose={() => onClose(Component)} {...props} />
      ))}
    </>
  );
};

export default ModalProvider;
