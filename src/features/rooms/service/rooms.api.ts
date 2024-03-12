import { PostEnterRoomReq, type PostRoomReq } from "~/features/rooms/model/rooms.schema";

import { supabase } from "~/shared/api/supabase";

export const postRoom = async (req: PostRoomReq) => {
  const { data, error } = await supabase.from("rooms").insert([req]).select().single();

  if (error) {
    throw error;
  } else {
    return data;
  }
};

export const postEnterRoom = async ({ room_id, password }: PostEnterRoomReq) => {
  const { data, error } = await supabase
    .from("rooms")
    .select()
    .eq("id", room_id)
    .eq("password", password)
    .single();

  if (error) {
    throw error;
  } else {
    return data;
  }
};
