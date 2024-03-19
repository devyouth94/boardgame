import { z } from "zod";

export const id = z.string();
export const full_name = z.string();
export const avatar_url = z.string();
export const nickname = z.string();
export const nickname_verified = z.boolean();

export type GetUserInfoRes = z.infer<typeof getUserInfoResSchema>;
const getUserInfoResSchema = z.object({
  id,
  full_name,
  avatar_url,
  nickname,
  nickname_verified,
});

export type GetValidateUserNameReq = z.infer<typeof getValidateUserNameSchema>;
const getValidateUserNameSchema = z.object({
  id: id.optional(),
  nickname,
});
