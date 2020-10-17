import Head from 'next/head';
import { signIn, signOut, useSession } from "next-auth/client";

export default function SigninPage() {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

        Sign in

    </>
  );
}