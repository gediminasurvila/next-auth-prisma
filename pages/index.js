import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Next Auth</title>
      </Head>

      <nav>
        {!session ? (
          <button onClick={() => signIn("github")}>GitHub Connect</button>
        ) : (
          <>
            <span>{session.user.name}</span>
            {session.user.image && (
              <img
                src={session.user.image}
                style={{ width: "25px", borderRadius: "50%" }}
              />
            )}
            <button onClick={signOut}>Sign Out</button>
          </>
        )}
      </nav>
    </>
  );
}