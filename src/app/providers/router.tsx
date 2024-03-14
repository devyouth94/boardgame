import { useRoutes } from "react-router-dom";

import Home from "~/pages/home/ui/home";
import Main from "~/pages/main/ui/main";
import Room from "~/pages/room/ui/room";
import SetupProfile from "~/pages/sign/ui/setup-profile";
import Sign from "~/pages/sign/ui/sign";

const Router = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "/sign",
      children: [
        { index: true, element: <Sign /> },
        { path: "setup-profile", element: <SetupProfile /> },
      ],
    },
    { path: "/main", element: <Main /> },
    { path: "/room/:roomId", element: <Room /> },
  ]);
};

const RouterProvider = () => {
  return <Router />;
};

export default RouterProvider;
