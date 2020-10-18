import React, { useState } from 'react'
import { csrfToken } from 'next-auth/client';
import { signIn, signOut, useSession } from "next-auth/client";


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

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



export default function SignUp({ csrfToken }) {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleFnameChange(e) {
    //Validation ?
    const value = e.target.value;
    setFname(value);
  }

  function handleLnameChange(e) {
    //Validation ?
    const value = e.target.value;
    setLname(value);
  }

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

  function handlePasswordConfirmChange(e) {
    //Validation ?
    const value = e.target.value;
    setPasswordConfirm(value);
  }

  function signup() {
    // Validation
    if(email && password) {

      const name = fname + ' ' + lname;
      signIn('credentials', { name, email, password, passwordConfirm, action: 'register' });
    }
 
  }


  return (

    <>

    <Typography variant="h3" component="h1">
      Sign Up
    </Typography>

<Grid container spacing={2} alignItems="center">
        
        <Grid item>
          <Paper>
            <FormControl variant="filled" size="small">
                <InputLabel htmlFor="fname">First Name</InputLabel>
                <FilledInput
                  color="secondary"
                  id="fname"
                  type='text'
                  value={fname}
                  onChange={handleFnameChange}
                />
              </FormControl>
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <FormControl variant="filled" size="small">
                <InputLabel htmlFor="lname">Last Name</InputLabel>
                <FilledInput
                  color="secondary"
                  id="lname"
                  type='text'
                  value={lname}
                  onChange={handleLnameChange}
                />
              </FormControl>
          </Paper>
        </Grid>

 </Grid>


 <Grid container spacing={2} alignItems="center">
        
        <Grid item>
          <Paper>
            <FormControl variant="filled" size="small">
                <InputLabel htmlFor="email">E-mail Address</InputLabel>
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

 </Grid>

 <Grid container spacing={2} alignItems="center">
        
        <Grid item>
          <Paper>
            <FormControl variant="filled" size="small">
                <InputLabel htmlFor="password">Password</InputLabel>
                <FilledInput
                  color="secondary"
                  id="password"
                  type='password'
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormControl>
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <FormControl variant="filled" size="small">
                <InputLabel htmlFor="passwordConfirm">Confirm Password</InputLabel>
                <FilledInput
                  color="secondary"
                  id="passwordConfirm"
                  type='password'
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                />
              </FormControl>
          </Paper>
        </Grid>

 </Grid>


 <Grid container spacing={2} alignItems="center">
        
        <Grid item>
          <Button variant="contained" size="large" color="secondary" onClick={ signup }>Sign Up</Button>
        </Grid>
</Grid>   

    </>
  )
}



SignUp.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context)
  }
}