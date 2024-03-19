import { useParams } from "react-router-dom";

import { useModalActions } from "~/features/modal/model/modal.store";
import ConfirmModal from "~/features/modal/ui/confirm-modal";
import { useDeleteRoom } from "~/features/rooms/service/rooms.query";

import usePlayerStatus from "~/entities/players/lib/use-player-status";
import { usePlayerActions, usePlayerState } from "~/entities/players/model/players.store";
import { useRoomActions, useRoomState } from "~/entities/rooms/model/rooms.store";

import { Button } from "~/shared/ui/button";

const RoomOwnerButtons = () => {
  const { roomId } = useParams();

  const { onOpenModal } = useModalActions();
  const { onClearPlayerMap } = usePlayerActions();
  const { onResetRoomInfo } = useRoomActions();

  const roomInfo = useRoomState();
  const playerMap = usePlayerState();
  const { isAllReady } = usePlayerStatus();

  const { mutate: deleteRoom, isPending: isDeleteRoomPending } = useDeleteRoom();

  const onClickStart = () => {
    console.log("start");
  };

  const onClickDelete = () => {
    onOpenModal(ConfirmModal, {
      title: "방 나가기",
      contents: `방장이 나가면 방이 사라져요.\n방을 지울까요?`,
      confirmTitle: "지우기",
      onConfirm: () => {
        deleteRoom(
          { room_id: roomId },
          {
            onSuccess: () => {
              onClearPlayerMap();
              onResetRoomInfo();
            },
          },
        );
      },
    });
  };

  return (
    <>
      <Button
        onClick={onClickStart}
        disabled={roomInfo!.min_players > playerMap!.size || !isAllReady}
      >
        게임 시작
      </Button>
      <Button variant="outline" onClick={onClickDelete} loading={isDeleteRoomPending}>
        나가기
      </Button>
    </>
  );
};

export default RoomOwnerButtons;
