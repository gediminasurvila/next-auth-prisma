import Head from 'next/head';
import { signIn, signOut, useSession } from "next-auth/client";
import SignIn from "../components/signin";
import SignUp from "../components/signup"; 

import MainLayout from '../layouts/MainLayout';

export default function Home() {
  const [session] = useSession();

  return (
    <MainLayout pageTitle='My App'>
      {!session && <SignUp />}
    </MainLayout>
  );
}