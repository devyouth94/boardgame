import ReactDOM from "react-dom/client";

import QueryClientProvider from "~/app/providers/query-client";
import RouterProvider from "~/app/providers/router";
import ToasterProvider from "~/app/providers/toaster";

import "~/app/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider>
    <ToasterProvider />
    <RouterProvider />
  </QueryClientProvider>,
);
