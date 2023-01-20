import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import { useState } from "react";
import RefreshTokenHandler from "@/components/refreshTokenHandler";
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import Layout from "@/components/global/Layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import '../styles/globals.css'

const layouts = {
  Main: Layout,
  Profile: ProfileLayout,
};

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [interval, setInterval] = useState(0);

  const { dehydratedState } = pageProps as { dehydratedState: unknown };

  const Layout = layouts[Component.layout] || ((children: React.PropsWithChildren<{}>) => <>{children}</>);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <SessionProvider session={session} refetchInterval={interval}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <RefreshTokenHandler setInterval={setInterval} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider >
  )
}