import { PutUserInfoReq } from "~/features/auth/model/auth.schema";
import { supabase } from "~/shared/api/supabase";

export const getUserInfo = async () => {
  return await supabase.auth.getSession();
};

export const putUserInfo = async (req: PutUserInfoReq) => {
  const { data, error } = await supabase.auth.updateUser({ data: req });

  if (error) {
    throw error;
  } else {
    return data.user;
  }
};

export const postSignInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `http://localhost:5174` },
  });
};

export const postSignOut = async () => {
  return await supabase.auth.signOut();
};
