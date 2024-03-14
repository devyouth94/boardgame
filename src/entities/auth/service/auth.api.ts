import { supabase } from "~/shared/api/supabase";

export const getUserInfo = async () => {
  return await supabase.auth.getSession();
};
