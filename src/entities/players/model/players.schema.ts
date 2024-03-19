import { z } from "zod";

export const avatar_url = z.string();
export const entered_at = z.string().nullable();
export const user_id = z.string();
export const left_at = z.string().nullable();
export const name = z.string();
export const ready_status = z.boolean();
export const room_id = z.string().nullable();
export const status = z.enum(["PENDING", "ENTERED", "GAMING", "FINISHED"]);

export type PlayerInfo = z.infer<typeof playerInfoSchema>;
export const playerInfoSchema = z.object({
  avatar_url,
  entered_at,
  id: user_id,
  left_at,
  name,
  ready_status,
  room_id,
  status,
});

type State = Map<string, PlayerInfo>;

interface Actions {
  onInsertPlayerMap: (map: State) => void;
  onChangePlayerMap: (updateFunc: (prev?: State) => State) => void;
  onClearPlayerMap: () => void;
}

export interface PlayerStore {
  playerMap?: State;
  actions: Actions;
}
