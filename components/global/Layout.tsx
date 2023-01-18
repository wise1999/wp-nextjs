import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { CssBaseline } from '@nextui-org/react';

export default function Layout({ children }: React.PropsWithChildren<{}>) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
