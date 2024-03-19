import SignOutButton from "~/features/auth/ui/sign-out-button";
import { useModalActions } from "~/features/modal/model/modal.store";
import useCheckHasEnteredRoom from "~/features/rooms/lib/use-check-has-entered-room";
import CreateModal from "~/features/rooms/ui/create-modal";
import EnterModal from "~/features/rooms/ui/enter-modal";

import { Button } from "~/shared/ui/button";

const Main = () => {
  useCheckHasEnteredRoom();

  const { onOpenModal } = useModalActions();

  const onClickCreate = () => {
    onOpenModal(CreateModal);
  };

  const onClickEnter = () => {
    onOpenModal(EnterModal);
  };

  return (
    <main className="flex h-dvh flex-col items-center justify-center px-5">
      <section className="flex w-full flex-col space-y-1">
        <Button onClick={onClickCreate}>생성하기</Button>
        <Button onClick={onClickEnter}>입장하기</Button>
        <SignOutButton />
      </section>
    </main>
  );
};

export default Main;
