import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useModalActions } from "~/features/modal/model/modal.store";
import ConfirmModal from "~/features/modal/ui/confirm-modal";
import useChangePlayerInfo from "~/features/players/lib/use-change-player-info";
import { useDeleteRoom } from "~/features/rooms/service/rooms.query";

import { useGetUserInfo } from "~/entities/auth/service/auth.query";
import { getHasEnteredRoom } from "~/entities/rooms/service/rooms.api";

/**
 * user가 들어가있는 방이 있는지 판단하는 로직입니다.
 */
const useCheckHasEnteredRoom = () => {
  const navigate = useNavigate();

  const { onOpenModal } = useModalActions();
  const { onExitRoom } = useChangePlayerInfo();
  const { mutate: deleteRoom } = useDeleteRoom();

  const { data: userInfo } = useGetUserInfo();

  useEffect(() => {
    if (!userInfo) return;

    (async () => {
      const data = await getHasEnteredRoom({ user_id: userInfo.id });

      if (data) {
        const isOwner = data.owner_id === userInfo.id;

        onOpenModal(ConfirmModal, {
          title: "알림",
          confirmTitle: "들어가기",
          onConfirm: () => navigate(`/room/${data.room_id}`),
          ...(isOwner
            ? {
                contents: `아직 들어가있는 방이 있어요.\n이동할까요? (현재 방장이에요)`,
                cancelTitle: "방 삭제하기",
                onCancel: () => deleteRoom({ room_id: data.room_id }),
              }
            : {
                contents: `아직 들어가있는 방이 있어요.\n이동할까요?`,
                cancelTitle: "방 나가기",
                onCancel: () => onExitRoom(data.room_id),
              }),
        });
      }
    })();
  }, [userInfo?.id]);
};

export default useCheckHasEnteredRoom;
