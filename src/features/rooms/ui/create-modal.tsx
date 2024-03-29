import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type ModalProps } from "~/features/modal/model/modal.schema";
import { createRoomSchema, type CreateRoomForm } from "~/features/rooms/model/rooms.schema";
import { usePostRoom } from "~/features/rooms/service/rooms.query";

import { GAME_TYPE } from "~/entities/rooms/consts";

import { getArrayToObject } from "~/shared/lib/data-format";
import { Button } from "~/shared/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "~/shared/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/shared/ui/select";

const CreateModal = ({ open, onClose }: ModalProps) => {
  const form = useForm<CreateRoomForm>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      game_type: "FUJI_FLUSH",
      players: {
        min_players: 4,
        max_players: 8,
      },
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const { mutate: postRoom, isPending } = usePostRoom();

  const onSubmit = ({ game_type, players, password }: CreateRoomForm) => {
    postRoom({ game_type, ...players, password });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>게임 생성</DialogHeader>

        <Form {...form}>
          <form id="create-room-form" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={control}
              name="game_type"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>게임 종류</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {getArrayToObject(GAME_TYPE).map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name="players"
              render={({ field }) => {
                const { min_players, max_players } = field.value;

                return (
                  <FormItem>
                    <FormLabel>{`게임 인원(최소4인~최대8인)`}</FormLabel>
                    <section className="grid grid-cols-2 gap-1">
                      <FormControl>
                        <Input
                          id="form-item-min-player"
                          type="number"
                          value={min_players}
                          onChange={(e) =>
                            field.onChange({ ...field.value, min_players: Number(e.target.value) })
                          }
                          className="text-center"
                        />
                      </FormControl>

                      <FormControl>
                        <Input
                          id="form-item-max-player"
                          type="number"
                          value={max_players}
                          onChange={(e) =>
                            field.onChange({ ...field.value, max_players: Number(e.target.value) })
                          }
                          className="text-center"
                        />
                      </FormControl>
                    </section>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>게임 비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button form="create-room-form" type="submit" loading={isPending} disabled={!isValid}>
            생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
