import type { GetValidateUserNameReq } from "~/entities/auth/model/auth.schema";

import { supabase } from "~/shared/api/supabase";

export const getUserInfo = async () => {
  return await supabase.auth.getSession();
};

export const getValidateUserName = async ({ id, nickname }: GetValidateUserNameReq) => {
  const { data, error } = await supabase
    .from("players")
    .select("name")
    .eq("name", nickname)
    .neq("id", id);

  if (error) {
    throw error;
  }

  if (data.length) {
    return { isDuplicate: true };
  } else {
    return { isDuplicate: false };
  }
};
