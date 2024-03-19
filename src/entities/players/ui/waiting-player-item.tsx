import { PlayerInfo } from "~/entities/players/model/players.schema";

import { Badge } from "~/shared/ui/badge";

interface Props extends PlayerInfo {
  owner: boolean;
}

const WaitingPlayerItem = ({ owner, avatar_url, name, ready_status }: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-2 pb-5">
      {owner && <Badge className="absolute left-2 top-2">방장</Badge>}

      <div className="size-10 overflow-hidden rounded-full">
        <img src={avatar_url} className="object-cover" />
      </div>

      <span className="text-xs font-black">{name}</span>

      {ready_status && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center rounded-b-md bg-green-500 py-1 text-xs font-bold text-white">
          준비
        </div>
      )}
    </div>
  );
};

export default WaitingPlayerItem;
