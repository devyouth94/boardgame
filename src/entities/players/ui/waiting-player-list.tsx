import { usePlayerState } from "~/entities/players/model/players.store";
import WaitingPlayerItem from "~/entities/players/ui/waiting-player-item";
import { useRoomState } from "~/entities/rooms/model/rooms.store";

import { cn } from "~/shared/lib/class-name";

const WaitingPlayerList = () => {
  const roomInfo = useRoomState();
  const playerMap = usePlayerState();

  return (
    <>
      {/* 사용자 정보 */}
      <section className="absolute inset-0 grid h-[calc(100dvh-var(--height-footer))] grid-cols-2 grid-rows-4 gap-2 p-4">
        {Array.from(playerMap!.values()).map((player) => (
          <WaitingPlayerItem key={player.id} owner={roomInfo!.owner_id === player.id} {...player} />
        ))}
      </section>

      {/* 카드 UI */}
      <section className="grid h-full grid-cols-2 grid-rows-4 gap-2 p-4">
        {Array.from({ length: 8 }).map((_, index) => {
          const isBlockCard = index + 1 > roomInfo!.max_players;

          return (
            <div
              key={index}
              className={cn(
                "rounded-md border border-solid border-gray-200",
                isBlockCard && "border-gray-100 bg-gray-50",
              )}
            />
          );
        })}
      </section>
    </>
  );
};

export default WaitingPlayerList;
