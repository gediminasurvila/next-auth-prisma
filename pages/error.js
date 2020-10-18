import Head from 'next/head';
import { signIn, signOut, useSession } from "next-auth/client";

export default function ErrorPAge() {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Error Auth</title>
      </Head>

      Error

    </>
  );
}