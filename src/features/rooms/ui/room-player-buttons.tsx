import { useParams } from "react-router-dom";

import useChangePlayerInfo from "~/features/players/lib/use-change-player-info";

import usePlayerStatus from "~/entities/players/lib/use-player-status";

import { Button } from "~/shared/ui/button";

const RoomPlayerButtons = () => {
  const { roomId } = useParams();
  const { isReady } = usePlayerStatus();

  const { onChangeReady, onExitRoom } = useChangePlayerInfo();

  return (
    <>
      <Button onClick={() => onChangeReady(!isReady)}>{isReady ? "준비 취소" : "준비"}</Button>
      <Button variant="outline" onClick={() => onExitRoom(roomId!)}>
        나가기
      </Button>
    </>
  );
};

export default RoomPlayerButtons;
