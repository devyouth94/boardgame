import { useMutation } from "@tanstack/react-query";

import { putPlayerInfo } from "~/features/players/services/players.api";

export const usePutPlayerInfo = () => {
  return useMutation({
    mutationFn: putPlayerInfo,
  });
};
