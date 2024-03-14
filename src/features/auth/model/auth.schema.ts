import { z } from "zod";

import { full_name, name_verified } from "~/entities/auth/model/auth.schema";

export type SetupProfileForm = z.infer<typeof setupProfileFormSchema>;
export const setupProfileFormSchema = z.object({
  full_name: full_name.min(2),
});

export type PutUserInfoReq = z.infer<typeof putUserInfoReqSchema>;
export const putUserInfoReqSchema = z
  .object({
    full_name,
    name_verified,
  })
  .partial();
