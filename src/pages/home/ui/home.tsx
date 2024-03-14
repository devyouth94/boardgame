import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGetUserInfo } from "~/entities/auth/service/auth.query";

const Home = () => {
  const navigate = useNavigate();

  const { data: userInfo, isSuccess } = useGetUserInfo();

  useEffect(() => {
    if (!isSuccess) return;

    if (!userInfo) {
      navigate("/sign");
      return;
    }

    if (userInfo && userInfo["name_verified"]) {
      navigate("/main");
    } else {
      navigate("/sign/setup-profile");
    }
  }, [isSuccess]);

  return <div className="flex h-dvh items-center justify-center">index page</div>;
};

export default Home;
