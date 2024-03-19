import RoomMoreInfoButton from "~/features/rooms/ui/room-more-info-button";
import RoomOwnerButtons from "~/features/rooms/ui/room-owner-buttons";
import RoomPlayerButtons from "~/features/rooms/ui/room-player-buttons";

import usePlayerStatus from "~/entities/players/lib/use-player-status";

import { cn } from "~/shared/lib/class-name";

const RoomFooter = () => {
  const { isOwner } = usePlayerStatus();

  return (
    <footer
      className={cn(
        "fixed inset-x-0 bottom-0",
        "h-footer grid grid-cols-[auto_1fr_1fr] gap-2 px-5 pt-4",
        "border-t border-solid border-gray-200 bg-white",
      )}
    >
      <RoomMoreInfoButton />

      {isOwner ? <RoomOwnerButtons /> : <RoomPlayerButtons />}
    </footer>
  );
};

export default RoomFooter;
