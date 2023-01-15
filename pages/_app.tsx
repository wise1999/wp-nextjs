import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import { useState } from "react";
import RefreshTokenHandler from "@/components/refreshTokenHandler";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [interval, setInterval] = useState(0);

  return (
    <SessionProvider session={session} refetchInterval={interval}>
      <Component {...pageProps} />
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  )
}