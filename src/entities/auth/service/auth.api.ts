import type { GetValidateUserNameReq } from "~/entities/auth/model/auth.schema";

import { supabase } from "~/shared/api/supabase";

export const getUserInfo = async () => {
  return await supabase.auth.getSession();
};

export const getValidateUserName = async ({ id, full_name }: GetValidateUserNameReq) => {
  const { data, error } = await supabase
    .from("players")
    .select()
    .eq("name", full_name)
    .neq("id", id)
    .select("name");

  if (error) {
    throw error;
  }

  if (data.length) {
    return { isValidate: false };
  } else {
    return { isValidate: true };
  }
};
