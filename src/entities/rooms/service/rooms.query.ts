import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { PlayerInfo } from "~/entities/players/model/players.schema";
import { getRoomInfo } from "~/entities/rooms/service/rooms.api";

const queryKey = {
  info: (roomId: string) => ["room-info", { roomId }],
};

export const useGetRoomInfo = () => {
  const { roomId } = useParams();

  return useQuery({
    queryKey: queryKey.info(roomId!),
    queryFn: () => getRoomInfo({ room_id: roomId! }),
    select: ({ players, ...room }) => {
      const playersMap = new Map<string, PlayerInfo>();
      players.forEach((player) => playersMap.set(player.id, player));

      return { room, players: playersMap };
    },
    enabled: !!roomId,
    refetchOnReconnect: false,
  });
};
