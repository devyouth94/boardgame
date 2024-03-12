import { type PostRoomReq } from "~/features/rooms/model/rooms.schema";

import { supabase } from "~/shared/api/supabase";

export const postRoom = async (req: PostRoomReq) => {
  const { data, error } = await supabase.from("rooms").insert([req]).select();

  if (error) {
    throw error;
  } else {
    return data;
  }
};
