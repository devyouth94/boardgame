import { z } from "zod";

export const GAME_TYPE = {
  FUJI_FLUSH: "후지 플러시",
  PENGUIN_PARTY: "펭귄파티",
};

const game_type = z.enum(["FUJI_FLUSH", "PENGUIN_PARTY"]);
const min_players = z.number().min(4).max(8);
const max_players = z.number().min(4).max(8);
const password = z.string().optional();
const room_id = z.string();
const owner_id = z.string();
// const status = z.enum(["PENDING", "FULL", "GAME"]);

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
export const postRoomReqSchema = z.object({
  game_type,
  min_players,
  max_players,
  password,
  owner_id,
});

export type PostEnterRoomReq = z.infer<typeof enterRoomSchema>;
export type EnterRoomForm = z.infer<typeof enterRoomSchema>;
export const enterRoomSchema = z.object({
  room_id,
  password,
});
