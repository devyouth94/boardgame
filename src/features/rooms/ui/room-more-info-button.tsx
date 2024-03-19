import ClipboardButton from "~/features/clipboard/ui/clipboard-button";

import { useRoomState } from "~/entities/rooms/model/rooms.store";

import { Button } from "~/shared/ui/button";
import Icon from "~/shared/ui/icon";
import { Input } from "~/shared/ui/input";
import { Label } from "~/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/popover";

const RoomMoreInfoButton = () => {
  const roomInfo = useRoomState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon name="Menu" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" align="start" className="space-y-2">
        <section>
          <Label className="ml-2">게임 번호</Label>
          <div className="flex gap-2">
            <Input readOnly value={roomInfo?.id} />
            <ClipboardButton value={roomInfo?.id} />
          </div>
        </section>

        <section>
          <Label className="ml-2">게임 비밀번호</Label>
          <div className="flex gap-2">
            <Input type="password" readOnly value={roomInfo?.password} />
            <ClipboardButton value={roomInfo?.password} />
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default RoomMoreInfoButton;
