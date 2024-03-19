import type {
  DeleteRoomReq,
  PostEnterRoomReq,
  PostRoomReq,
} from "~/features/rooms/model/rooms.schema";

import { supabase } from "~/shared/api/supabase";

export const postRoom = async (req: PostRoomReq) => {
  const { data, error } = await supabase.from("rooms").insert([req]).select("id").single();

  if (error) {
    throw error;
  } else {
    return data;
  }
};

export const postEnterRoom = async ({ room_id, password }: PostEnterRoomReq) => {
  const { data: roomInfo } = await supabase
    .from("rooms")
    .select("id, max_players")
    .eq("id", room_id)
    .eq("password", password)
    .single();

  if (!roomInfo) {
    throw new Error("게임 번호 또는 비밀번호를 다시 확인해주세요");
  }

  const { data: playerInfo } = await supabase
    .from("players")
    .select("room_id")
    .eq("room_id", roomInfo.id);

  if (playerInfo!.length >= roomInfo.max_players) {
    throw new Error("방의 인원이 전부 찼어요");
  }

  return roomInfo;
};

export const deleteRoom = async ({ room_id }: DeleteRoomReq) => {
  const { error } = await supabase.from("rooms").delete().eq("id", room_id);

  if (error) {
    throw error;
  } else {
    return "success";
  }
};
