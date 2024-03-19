import { useMemo } from "react";

import { useGetUserInfo } from "~/entities/auth/service/auth.query";
import { usePlayerState } from "~/entities/players/model/players.store";
import { useRoomState } from "~/entities/rooms/model/rooms.store";

const usePlayerStatus = () => {
  const { data: userInfo } = useGetUserInfo();

  const roomInfo = useRoomState();
  const playerMap = usePlayerState();

  const isOwner = useMemo(() => {
    if (!userInfo || !roomInfo) return;
    return userInfo.id === roomInfo.owner_id;
  }, [userInfo?.id, roomInfo?.owner_id]);

  const isReady = userInfo && playerMap ? playerMap.get(userInfo.id)?.ready_status : undefined;

  const isAllReady =
    playerMap && [...playerMap].find(([, value]) => !value.ready_status) === undefined;

  return { isOwner, isReady, isAllReady };
};

export default usePlayerStatus;
