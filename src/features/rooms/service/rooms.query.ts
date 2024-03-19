import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useChangePlayerInfo from "~/features/players/lib/use-change-player-info";
import { deleteRoom, postEnterRoom, postRoom } from "~/features/rooms/service/rooms.api";

export const usePostRoom = () => {
  const { onCreateRoom } = useChangePlayerInfo();

  return useMutation({
    mutationFn: postRoom,
    onSuccess: (room) => {
      onCreateRoom(room.id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const usePostEnterRoom = () => {
  const { onEnterRoom } = useChangePlayerInfo();

  return useMutation({
    mutationFn: postEnterRoom,
    onSuccess: (room) => {
      onEnterRoom(room.id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteRoom = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      navigate("/main", { replace: true });
    },
  });
};
