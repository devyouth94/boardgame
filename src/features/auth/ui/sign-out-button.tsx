import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { postSignOut } from "~/features/auth/service/auth.api";
import { Button } from "~/shared/ui/button";

const SignOutButton = () => {
  const navigate = useNavigate();

  const onClickSignOut = async () => {
    try {
      await postSignOut();
      navigate("/sign");
    } catch (error) {
      toast.error("문제가 발생했어요");
    }
  };

  return (
    <Button variant="link" onClick={onClickSignOut}>
      로그아웃
    </Button>
  );
};

export default SignOutButton;
