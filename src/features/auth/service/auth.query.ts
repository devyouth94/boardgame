import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { putUserInfo } from "~/features/auth/service/auth.api";

export const usePutUserInfo = () => {
  return useMutation({
    mutationFn: putUserInfo,
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
