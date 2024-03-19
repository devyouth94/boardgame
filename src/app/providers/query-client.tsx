import { QueryClient, QueryClientProvider as RawQueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, refetchOnWindowFocus: false },
  },
});

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <RawQueryClientProvider client={queryClient}>{children}</RawQueryClientProvider>;
};

export default QueryClientProvider;
