import { type UserMetadata } from "@supabase/supabase-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { getUserInfo, putUserInfo } from "~/features/auth/service/auth.api";

const queryKey = {
  info: ["user-info"],
};

type useGetUserInfoReturnType = (UserMetadata & { id?: string }) | undefined;
export const useGetUserInfo = () => {
  return useQuery({
    queryKey: queryKey.info,
    queryFn: getUserInfo,
    select: ({ data }): useGetUserInfoReturnType => {
      const id = data.session?.user.id;
      const metadata = data.session?.user.user_metadata;

      return data.session ? { ...metadata, id } : undefined;
    },
  });
};

export const usePutUserInfo = () => {
  return useMutation({
    mutationFn: putUserInfo,
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
