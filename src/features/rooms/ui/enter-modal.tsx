import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { EnterRoomForm, enterRoomSchema } from "~/features/rooms/model/rooms.schema";
import { usePostEnterRoom } from "~/features/rooms/service/rooms.query";

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

const EnterModal = () => {
  const form = useForm<EnterRoomForm>({
    resolver: zodResolver(enterRoomSchema),
    defaultValues: {
      room_id: "",
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

  const { mutate: postEnterRoom } = usePostEnterRoom();

  const [open, setOpen] = useState(false);

  const onOpenChange = () => {
    setOpen((prev) => !prev);
    reset();
    clearErrors();
  };

  const onSubmit = ({ room_id, password }: EnterRoomForm) => {
    postEnterRoom({ room_id, password });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full">입장하기</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>게임 입장</DialogHeader>

        <Form {...form}>
          <form id="enter-room-form" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={control}
              name="room_id"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>게임 번호</FormLabel>
                    <FormControl>
                      <Input placeholder="게임 번호를 입력해주세요" {...field} />
                    </FormControl>
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
                      <Input
                        type="password"
                        placeholder="게임 비밀번호를 입력해주세요"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button form="enter-room-form" type="submit" loading={isSubmitting} disabled={!isValid}>
            입장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnterModal;
