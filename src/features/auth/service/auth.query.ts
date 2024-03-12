import { type UserMetadata } from "@supabase/supabase-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { getUserInfo, putUserInfo } from "~/features/auth/service/auth.api";

const queryKey = {
  info: ["user-info"],
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: queryKey.info,
    queryFn: getUserInfo,
    select: ({ data }): UserMetadata & { id?: string } => {
      const id = data.session?.user.id;
      const metadata = data.session?.user.user_metadata;

      return { ...metadata, id };
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
