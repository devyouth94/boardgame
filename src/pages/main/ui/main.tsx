import CreateModal from "~/features/rooms/ui/create-modal";
import EnterModal from "~/features/rooms/ui/enter-modal";

const Main = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-5">
      <div className="w-full space-y-1">
        <CreateModal />
        <EnterModal />
      </div>
    </div>
  );
};

export default Main;
