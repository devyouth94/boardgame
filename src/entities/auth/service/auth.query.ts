import { useQuery } from "@tanstack/react-query";

import { GetUserInfoRes } from "~/entities/auth/model/auth.schema";
import { getUserInfo } from "~/entities/auth/service/auth.api";

const queryKey = {
  info: ["user-info"],
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: queryKey.info,
    queryFn: getUserInfo,
    select: ({ data }): GetUserInfoRes | undefined => {
      const id = data.session?.user.id;
      const metadata = data.session?.user.user_metadata;

      return data.session
        ? {
            id: id!,
            full_name: metadata?.full_name,
            avatar_url: metadata?.avatar_url,
            nickname: metadata?.nickname,
            nickname_verified: metadata?.nickname_verified,
          }
        : undefined;
    },
  });
};
