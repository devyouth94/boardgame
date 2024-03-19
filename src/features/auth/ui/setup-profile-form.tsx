import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { setupProfileFormSchema, type SetupProfileForm } from "~/features/auth/model/auth.schema";
import { usePutUserInfo } from "~/features/auth/service/auth.query";

import { getValidateUserName } from "~/entities/auth/service/auth.api";
import { useGetUserInfo } from "~/entities/auth/service/auth.query";

import { Button } from "~/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";

const SetupProfileForm = () => {
  const navigate = useNavigate();

  const { mutate: putUserInfo } = usePutUserInfo();

  const { data: userInfo, isFetching } = useGetUserInfo();

  const form = useForm<SetupProfileForm>({
    resolver: zodResolver(setupProfileFormSchema),
    defaultValues: {
      nickname: "",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async ({ nickname }: SetupProfileForm) => {
    try {
      const { isDuplicate } = await getValidateUserName({ id: userInfo?.id, nickname });

      if (isDuplicate) {
        toast.error("같은 이름을 가진 유저가 있어요");
        return;
      }

      putUserInfo(
        { nickname, nickname_verified: true },
        {
          onSuccess: (data) => {
            toast.success(`${data.nickname}님, 어서오세요!`);
            navigate("/main", { replace: true });
          },
        },
      );
    } catch (error) {
      toast.error("다시 시도해주세요");
    }
  };

  useEffect(() => {
    if (!userInfo) return;
    setValue("nickname", userInfo["full_name"], { shouldValidate: true });
  }, [isFetching]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[375px] space-y-2">
        <FormField
          control={control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{`게임에 사용할 닉네임을 입력해주세요 (최소2자, 최대10자)`}</FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" loading={isSubmitting} disabled={!isValid}>
          확인
        </Button>
      </form>
    </Form>
  );
};

export default SetupProfileForm;
