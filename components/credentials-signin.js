import React from 'react'
import { csrfToken } from 'next-auth/client';
import { signIn, signOut, useSession } from "next-auth/client";

export default function SignIn({ csrfToken }) {

  function login() {
    signIn('credentials', { username: 'jsmith', password: '1234' }); 
  }


  return (
    <>
      <label>
        Username
        <input name='username' type='text'/>
      </label>
      <label>
        Password
        <input name='password' type='text'/>
      </label>
      <button type='submit' onClick={login}>Sign in</button>

    </>
  )
}



SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context)
  }
}