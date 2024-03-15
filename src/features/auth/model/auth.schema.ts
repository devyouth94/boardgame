import { z } from "zod";

import { nickname, nickname_verified } from "~/entities/auth/model/auth.schema";

export type SetupProfileForm = z.infer<typeof setupProfileFormSchema>;
export const setupProfileFormSchema = z.object({
  nickname: nickname.min(2).max(10),
});

export type PutUserInfoReq = z.infer<typeof putUserInfoReqSchema>;
export const putUserInfoReqSchema = z
  .object({
    nickname,
    nickname_verified,
  })
  .partial();
