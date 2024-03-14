import { z } from "zod";

export const id = z.string();
export const avatar_url = z.string();
export const full_name = z.string();
export const name_verified = z.boolean();

export type GetUserInfoRes = z.infer<typeof getUserInfoResSchema>;
const getUserInfoResSchema = z.object({
  id,
  avatar_url,
  full_name,
  name_verified,
});
