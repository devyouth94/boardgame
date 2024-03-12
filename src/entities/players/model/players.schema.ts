import { z } from "zod";

const room_id = z.string().nullable();
const user_id = z.string();

export const putPlayerInfoSchema = z.object({
  user_id,
  room_id,
});

export type PutPlayerInfoReq = z.infer<typeof putPlayerInfoSchema>;
