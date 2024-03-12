import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useGetUserInfo } from "~/features/auth/service/auth.query";
import { postEnterRoom, postRoom } from "~/features/rooms/service/rooms.api";

import { usePutPlayerInfo } from "~/entities/players/services/players.query";

export const usePostRoom = () => {
  const navigate = useNavigate();

  const { data: userInfo, isFetching } = useGetUserInfo();
  const { mutate: putPlayerInfo } = usePutPlayerInfo();

  return useMutation({
    mutationFn: postRoom,
    onSuccess: (data) => {
      const roomId = data.id;

      if (!isFetching && userInfo) {
        putPlayerInfo(
          { user_id: userInfo.id!, room_id: roomId, ready_status: true },
          { onSuccess: () => navigate(`/room/${roomId}`) },
        );
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const usePostEnterRoom = () => {
  const navigate = useNavigate();

  const { data: userInfo, isFetching } = useGetUserInfo();
  const { mutate: putPlayerInfo } = usePutPlayerInfo();

  return useMutation({
    mutationFn: postEnterRoom,
    onSuccess: (data) => {
      const roomId = data.id;

      if (!isFetching && userInfo) {
        putPlayerInfo(
          { user_id: userInfo.id!, room_id: roomId },
          { onSuccess: () => navigate(`/room/${roomId}`) },
        );
      }
    },
    onError: () => {
      toast.error("게임 번호와 비밀번호를 다시 확인해주세요");
    },
  });
};
