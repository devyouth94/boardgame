import { postSignInWithGoogle } from "~/features/auth/service/auth.api";

import { Button } from "~/shared/ui/button";

const SignInButton = () => {
  const onClickSignInWithGoogle = async () => {
    await postSignInWithGoogle();
  };

  return (
    <Button className="w-full" onClick={onClickSignInWithGoogle}>
      구글로 로그인하기
    </Button>
  );
};

export default SignInButton;
