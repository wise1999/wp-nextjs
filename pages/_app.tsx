import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import { useState } from "react";
import RefreshTokenHandler from "@/components/refreshTokenHandler";
import { QueryClientProvider, QueryClient } from 'react-query';
import Layout from "@/components/global/Layout";
import { createTheme, NextUIProvider } from '@nextui-org/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {}
  }
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [interval, setInterval] = useState(0);

  return (
    <QueryClientProvider client={queryClient} >
      <SessionProvider session={session} refetchInterval={interval}>
        <NextUIProvider theme={darkTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
        <RefreshTokenHandler setInterval={setInterval} />
      </SessionProvider>
    </QueryClientProvider >
  )
}