import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ModalProvider from "~/app/providers/modal";
import QueryClientProvider from "~/app/providers/query-client";
import RouterProvider from "~/app/providers/router";
import ToasterProvider from "~/app/providers/toaster";

import "~/app/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider>
    <BrowserRouter>
      <ModalProvider />
      <ToasterProvider />
      <RouterProvider />
    </BrowserRouter>
  </QueryClientProvider>,
);
