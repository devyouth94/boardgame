import { z } from "zod";

import {
  game_type,
  max_players,
  min_players,
  password,
  room_id,
} from "~/entities/rooms/model/rooms.schema";

export type CreateRoomForm = z.infer<typeof createRoomSchema>;
export const createRoomSchema = z
  .object({
    game_type,
    players: z.object({
      min_players,
      max_players,
    }),
    password,
  })
  .refine(({ players }) => players.min_players <= players.max_players, {
    path: ["players", "min_players"],
  })
  .refine(({ players }) => players.min_players <= players.max_players, {
    path: ["players", "max_players"],
  });

export type PostRoomReq = z.infer<typeof postRoomReqSchema>;
const postRoomReqSchema = z.object({
  game_type,
  min_players,
  max_players,
  password,
});

export type PostEnterRoomReq = z.infer<typeof enterRoomSchema>;
export type EnterRoomForm = z.infer<typeof enterRoomSchema>;
export const enterRoomSchema = z.object({
  room_id,
  password,
});

export type DeleteRoomReq = z.infer<typeof deleteRoomReqSchema>;
const deleteRoomReqSchema = z.object({
  room_id: room_id.optional(),
});
