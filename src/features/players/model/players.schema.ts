import { z } from "zod";

import { ready_status, room_id, status, user_id } from "~/entities/players/model/players.schema";

export type PutPlayerInfoReq = z.infer<typeof putPlayerInfoSchema>;
const putPlayerInfoSchema = z
  .object({
    user_id,
    room_id: room_id.nullable(),
    status,
    ready_status,
  })
  .partial();
