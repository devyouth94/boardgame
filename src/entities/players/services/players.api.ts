import { PutPlayerInfoReq } from "~/entities/players/model/players.schema";

import { supabase } from "~/shared/api/supabase";

export const putPlayerInfo = async ({ room_id, user_id }: PutPlayerInfoReq) => {
  const { data, error } = await supabase.from("players").update({ room_id }).eq("id", user_id);

  if (error) {
    throw error;
  } else {
    return data;
  }
};
