import { ReactNode } from "react";

import type { ModalProps } from "~/features/modal/model/modal.schema";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/shared/ui/alert-dialog";

interface Props {
  title: string;
  contents: ReactNode;
  confirmOnly?: boolean;
  confirmTitle?: string;
  cancelTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmModal = ({
  open,
  onClose,
  title,
  contents,
  confirmOnly = false,
  confirmTitle = "확인",
  cancelTitle = "취소",
  onConfirm = () => {},
  onCancel = () => {},
}: ModalProps<Props>) => {
  const onClickConfirm = () => {
    onConfirm();
    onClose();
  };

  const onClickCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>

        <section className="whitespace-pre-wrap text-pretty text-center">{contents}</section>

        <AlertDialogFooter>
          {!confirmOnly && (
            <AlertDialogCancel onClick={onClickCancel}>{cancelTitle}</AlertDialogCancel>
          )}
          <AlertDialogAction onClick={onClickConfirm}>{confirmTitle}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
