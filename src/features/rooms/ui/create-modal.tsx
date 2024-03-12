import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useGetUserInfo } from "~/features/auth/service/auth.query";
import {
  GAME_TYPE,
  createRoomSchema,
  type CreateRoomForm,
} from "~/features/rooms/model/rooms.schema";
import { usePostRoom } from "~/features/rooms/service/rooms.query";

import { getArrayToObject } from "~/shared/lib/data-format";
import { Button } from "~/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "~/shared/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/shared/ui/select";

const CreateModal = () => {
  const { data: userInfo, isFetching } = useGetUserInfo();

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
    reset,
    clearErrors,
    formState: { isValid, isSubmitting },
  } = form;

  const { mutate: postRoom } = usePostRoom();

  const [open, setOpen] = useState(false);

  const onOpenChange = () => {
    setOpen((prev) => !prev);
    reset();
    clearErrors();
  };

  const onSubmit = ({ game_type, players, password }: CreateRoomForm) => {
    const { min_players, max_players } = players;

    if (!isFetching && userInfo) {
      postRoom(
        {
          game_type,
          min_players,
          max_players,
          password,
          owner_id: userInfo.id!,
        },
        { onSuccess: onOpenChange },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full">생성하기</Button>
      </DialogTrigger>

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
                    <section className="flex gap-1">
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
          <Button form="create-room-form" type="submit" loading={isSubmitting} disabled={!isValid}>
            생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
