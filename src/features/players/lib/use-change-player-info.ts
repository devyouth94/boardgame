import { useNavigate } from "react-router-dom";

import { usePutPlayerInfo } from "~/features/players/services/players.query";

import { useGetUserInfo } from "~/entities/auth/service/auth.query";
import { usePlayerActions } from "~/entities/players/model/players.store";
import { useRoomActions } from "~/entities/rooms/model/rooms.store";

const useChangePlayerInfo = () => {
  const navigate = useNavigate();

  const { data: userInfo } = useGetUserInfo();

  const { mutate, isPending: isPutUserInfoPending } = usePutPlayerInfo();
  const { onClearPlayerMap } = usePlayerActions();
  const { onResetRoomInfo } = useRoomActions();

  /**
   * @description 방 생성시 플레이어의 status, ready_status 변경
   */
  const onCreateRoom = (roomId: string) => {
    mutate(
      { room_id: roomId, status: "ENTERED", ready_status: true, user_id: userInfo?.id },
      { onSuccess: () => navigate(`/room/${roomId}`) },
    );
  };

  /**
   * @description 방 입장시 플레이어의 status 변경
   */
  const onEnterRoom = (roomId: string) => {
    mutate(
      { room_id: roomId, status: "ENTERED", user_id: userInfo?.id },
      { onSuccess: () => navigate(`/room/${roomId}`) },
    );
  };

  /**
   * @description 방 퇴장시 플레이어의 status 변경
   */
  const onExitRoom = (roomId: string) => {
    mutate(
      { room_id: roomId, status: "PENDING", user_id: userInfo?.id },
      {
        onSuccess: () => {
          onClearPlayerMap();
          onResetRoomInfo();
          navigate("/main", { replace: true });
        },
      },
    );
  };

  /**
   * @description 게임 준비 시 및 준비 해제 시 플레이어의 ready_status 변경
   */
  const onChangeReady = (isReady: boolean) => {
    mutate({ ready_status: isReady, user_id: userInfo?.id });
  };

  return { onCreateRoom, onEnterRoom, onExitRoom, onChangeReady, isPutUserInfoPending };
};

export default useChangePlayerInfo;
