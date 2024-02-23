import { useRoutes } from "react-router-dom";

import Index from "~/pages";

const Router = () => {
  return useRoutes([{ path: "/", element: <Index /> }]);
};

export default Router;
