import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { usePlayerActions, usePlayerState } from "~/entities/players/model/players.store";
import { useRoomActions, useRoomState } from "~/entities/rooms/model/rooms.store";
import { useGetRoomInfo } from "~/entities/rooms/service/rooms.query";

/**
 * @description 방 정보 조회 API 요청 후 zustand store에 동기화 하는 hooks 입니다.
 */
const useSyncRoomInfo = () => {
  const navigate = useNavigate();
  const { data, error, isFetching } = useGetRoomInfo();

  const roomInfo = useRoomState();
  const playerMap = usePlayerState();

  const { onInsertRoomInfo } = useRoomActions();
  const { onInsertPlayerMap } = usePlayerActions();

  useEffect(() => {
    if (isFetching) return;

    if (error) {
      navigate("/main", { replace: true });
      toast.error("방이 없거나 문제가 생겼어요");
      return;
    }

    if (data) {
      onInsertRoomInfo(data.room);
      onInsertPlayerMap(data.players);
    }
  }, [isFetching]);

  return { isSyncFinished: !!roomInfo && !!playerMap };
};

export default useSyncRoomInfo;
