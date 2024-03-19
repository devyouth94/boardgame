import useRoomChannel from "~/features/rooms/lib/use-room-channel";
import RoomFooter from "~/features/rooms/ui/room-footer";

import WaitingPlayerList from "~/entities/players/ui/waiting-player-list";
import useSyncRoomInfo from "~/entities/rooms/lib/use-sync-room-info";

const Room = () => {
  useRoomChannel();

  const { isSyncFinished } = useSyncRoomInfo();

  return (
    <>
      {isSyncFinished && (
        <>
          <main className="pb-footer relative h-dvh">
            <WaitingPlayerList />
          </main>

          <RoomFooter />
        </>
      )}
    </>
  );
};

export default Room;
