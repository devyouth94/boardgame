import { z } from "zod";

const room_id = z.string().nullable();
const user_id = z.string();
const ready_status = z.boolean();

export const putPlayerInfoSchema = z
  .object({
    user_id,
    room_id,
    ready_status,
  })
  .partial();

export type PutPlayerInfoReq = z.infer<typeof putPlayerInfoSchema>;
