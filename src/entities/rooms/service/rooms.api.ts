import type {
  GetHasEnteredRoomReq,
  GetHasEnteredRoomRes,
  GetRoomInfoReq,
  RoomInfo,
} from "~/entities/rooms/model/rooms.schema";

import { supabase } from "~/shared/api/supabase";

export const getRoomInfo = async ({ room_id }: GetRoomInfoReq): Promise<RoomInfo> => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*, players (*)")
    .eq("id", room_id)
    .not("players.entered_at", "is", null)
    .order("entered_at", { referencedTable: "players" })
    .single();

  if (error) {
    throw error;
  } else {
    return data;
  }
};

export const getHasEnteredRoom = async ({
  user_id,
}: GetHasEnteredRoomReq): Promise<GetHasEnteredRoomRes | undefined> => {
  const { data, error } = await supabase
    .from("players")
    .select("room_id, entered_at, rooms (owner_id)")
    .eq("id", user_id)
    .not("entered_at", "is", null)
    .maybeSingle();

  if (error) {
    throw error;
  } else {
    if (data) {
      const rooms = data.rooms as any;

      return {
        room_id: data.room_id,
        owner_id: rooms.owner_id,
        entered_at: data.entered_at,
      };
    }

    return undefined;
  }
};
