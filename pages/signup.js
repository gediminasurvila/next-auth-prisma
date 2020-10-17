import Head from 'next/head';
import { signIn, signOut, useSession } from "next-auth/client";

export default function SignupPage() {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

        Sign up page

    </>
  );
}