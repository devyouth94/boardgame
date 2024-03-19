import { z } from "zod";

import { playerInfoSchema } from "~/entities/players/model/players.schema";

export const created_at = z.string();
export const game_type = z.enum(["FUJI_FLUSH", "PENGUIN_PARTY"]);
export const room_id = z.string();
export const min_players = z.number().min(4).max(8);
export const max_players = z.number().min(4).max(8);
export const owner_id = z.string();
export const password = z.string().optional();
export const status = z.enum(["PENDING", "GAMING"]);
export const user_id = z.string();

export type RoomInfo = z.infer<typeof roomInfoSchema>;
const roomInfoSchema = z.object({
  created_at,
  game_type,
  id: room_id,
  max_players,
  min_players,
  owner_id,
  password,
  players: z.array(playerInfoSchema),
  status,
});

export type GetRoomInfoReq = z.infer<typeof getroomInfoReqSchema>;
const getroomInfoReqSchema = z.object({
  room_id,
});

export type GetHasEnteredRoomReq = z.infer<typeof hasEnteredRoomSchema>;
const hasEnteredRoomSchema = z.object({
  user_id: user_id.optional(),
});

export type GetHasEnteredRoomRes = z.infer<typeof getHasEnteredRoomResSchema>;
const getHasEnteredRoomResSchema = z.object({
  entered_at: z.string(),
  room_id,
  owner_id,
});

type State = Omit<RoomInfo, "players">;

interface Actions {
  onInsertRoomInfo: (roomInfo: State) => void;
  onChangeRoomInfo: (roomInfo: Partial<State>) => void;
  onResetRoomInfo: () => void;
}

export interface RoomStore {
  room?: State;
  actions: Actions;
}
