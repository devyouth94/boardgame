import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ModalProps } from "~/features/modal/model/modal.schema";
import { EnterRoomForm, enterRoomSchema } from "~/features/rooms/model/rooms.schema";
import { usePostEnterRoom } from "~/features/rooms/service/rooms.query";

import { Button } from "~/shared/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "~/shared/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";

const EnterModal = ({ open, onClose }: ModalProps) => {
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
    formState: { isValid },
  } = form;

  const { mutate: postEnterRoom, isPending } = usePostEnterRoom();

  const onSubmit = ({ room_id, password }: EnterRoomForm) => {
    postEnterRoom({ room_id, password });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
          <Button form="enter-room-form" type="submit" loading={isPending} disabled={!isValid}>
            입장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnterModal;
