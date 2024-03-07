import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { setupProfileSchema, type SetupProfileForm } from "~/features/auth/model/auth.schema";
import { useGetUserInfo, usePutUserInfo } from "~/features/auth/service/auth.query";

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

  const { data: userInfo, isFetching } = useGetUserInfo();
  const { mutate: putUserInfo } = usePutUserInfo();

  const form = useForm<SetupProfileForm>({
    resolver: zodResolver(setupProfileSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = ({ name }: SetupProfileForm) => {
    putUserInfo(
      { name, name_verified: true },
      {
        onSuccess: (data) => {
          toast.success(`${data.user_metadata.name}님, 어서오세요!`);
          navigate("/main", { replace: true });
        },
      },
    );
  };

  useEffect(() => {
    if (!userInfo) return;
    setValue("name", userInfo["name"], { shouldValidate: true });
  }, [isFetching]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[375px] space-y-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{`게임에 사용할 닉네임을 입력해주세요 (2글자 이상)`}</FormDescription>
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
