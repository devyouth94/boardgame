import { z } from "zod";

const name = z.string().min(2);

export const setupProfileSchema = z.object({
  name,
});

export const putUserInfoReqSchema = z
  .object({
    name,
    name_verified: z.boolean(),
  })
  .partial();

export type SetupProfileForm = z.infer<typeof setupProfileSchema>;
export type PutUserInfoReq = z.infer<typeof putUserInfoReqSchema>;
