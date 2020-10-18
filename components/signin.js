import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { csrfToken } from 'next-auth/client';
import { signIn, signOut, useSession } from "next-auth/client";

export default function SignIn({ csrfToken }) {

  const [session] = useSession();
  const [showPassword, setShowpassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    //Validation ?
    const value = e.target.value;
    setEmail(value);
  }

  function handlePasswordChange(e) {
    //Validation ?
    const value = e.target.value;
    setPassword(value);
  }

  function login() {
    // Validation
    if(email && password) {
      signIn('credentials', { email, password });
    }
  }

  function handleClickShowPassword() {
    setShowpassword(!showPassword);
  }

  function handleMouseDownPassword(e) {
   e.preventDefault();
  }

  return (
    <>
    {!session ? (
      <Grid container spacing={2} alignItems="center">
        
        <Grid item>
          <Paper>
            <FormControl variant="filled" size="small">
                <InputLabel htmlFor="email">Email</InputLabel>
                <FilledInput
                  color="secondary"
                  id="email"
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormControl>
          </Paper>
        </Grid>
     

        <Grid item>
        <Paper>
          <FormControl variant="filled" size="small">
              <InputLabel htmlFor="password">Password</InputLabel>
              <FilledInput
                color="secondary"
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
        </Paper>
        </Grid>
     
        <Grid item>
          <Button variant="contained" size="large" color="secondary" onClick={login}>Sign In</Button>
      </Grid>
  
      </Grid>
    ) : (
      <>
      
        <span>{session.user.name}</span>
        <Button variant="contained" size="large" color="secondary" onClick={signOut}>Sign Out</Button>
     
      </>
    )}
  </>

  )
}


SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context)
  }
}