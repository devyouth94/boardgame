import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useGetUserInfo } from "~/features/auth/service/auth.query";
import { postRoom } from "~/features/rooms/service/rooms.api";

import { usePutPlayerInfo } from "~/entities/players/services/players.query";

export const usePostRoom = () => {
  const navigate = useNavigate();

  const { data: userInfo, isFetching } = useGetUserInfo();
  const { mutate: putPlayerInfo } = usePutPlayerInfo();

  return useMutation({
    mutationFn: postRoom,
    onSuccess: (data) => {
      const roomId = data[0].id;

      if (!isFetching && userInfo) {
        putPlayerInfo(
          { user_id: userInfo.id!, room_id: roomId },
          { onSuccess: () => navigate(`/room/${roomId}`) },
        );
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
