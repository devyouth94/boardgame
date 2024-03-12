import { useMutation } from "@tanstack/react-query";

import { putPlayerInfo } from "~/entities/players/services/players.api";

export const usePutPlayerInfo = () => {
  return useMutation({
    mutationFn: putPlayerInfo,
  });
};
