"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5, // 5 minutes - data is fresh for 5 mins
                        gcTime: 1000 * 60 * 30, // 30 minutes - cache persists for 30 mins
                        refetchOnWindowFocus: false, // Don't refetch on window focus
                        refetchOnMount: false, // Don't refetch on mount if data exists
                        refetchOnReconnect: false, // Don't refetch on reconnect
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}