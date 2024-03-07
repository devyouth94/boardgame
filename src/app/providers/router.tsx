import { BrowserRouter, useRoutes } from "react-router-dom";

import Home from "~/pages/home/ui/home";
import Main from "~/pages/main/ui/main";
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
  ]);
};

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default RouterProvider;