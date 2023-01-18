import Head from 'next/head'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Home() {
  const session = useSession();

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main>
        <h1>Welcome {session.data?.user?.name}</h1>
        {session.data && <button onClick={() => signOut()}>Sign Out</button>}
        {!session.data && <Link href="/login">Sign In</Link>}
        {!session.data && <Link href="/register">Sign Up</Link>}
      </main>
    </>
  )
}
