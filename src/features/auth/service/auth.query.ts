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
    select: ({ data }) => data.session?.user.user_metadata,
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
