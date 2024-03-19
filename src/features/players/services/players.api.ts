import { PutPlayerInfoReq } from "~/features/players/model/players.schema";

import { supabase } from "~/shared/api/supabase";

export const putPlayerInfo = async ({
  room_id,
  status,
  ready_status,
  user_id,
}: PutPlayerInfoReq) => {
  const { data, error } = await supabase
    .from("players")
    .update({ room_id, status, ready_status })
    .eq("id", user_id);

  if (error) {
    throw error;
  } else {
    return data;
  }
};
