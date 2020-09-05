import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import SnackBar from './SnackBar';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [mode, setMode] = useState(true);
  const [msg, setMsg] = useState({
    disp: false
  });

  function signIn()
  {
    ReactDOM.render(<LinearProgress />, document.getElementById("progress"));
    firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("password").value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      setMsg({
        disp: true,
        message: errorMessage,
        severity: "error"
      });
      ReactDOM.render("", document.getElementById("progress"));
    });
  }

  function register()
  {
    if(document.getElementById("password").value!==document.getElementById("password1").value)
    {
      setMsg({
        disp: true,
        severity: "error",
        message: "The passwords don't match!"
      });
      return;
    }
    ReactDOM.render(<LinearProgress />, document.getElementById("progress"));
    firebase.auth().createUserWithEmailAndPassword(document.getElementById("email").value, document.getElementById("password").value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      setMsg({
        disp: true,
        message: errorMessage,
        severity: "error"
      });
      ReactDOM.render("", document.getElementById("progress"));
    });
  }

  function signUp()
  {
    if(mode)
    setMode(false);
    else
    setMode(true);
  }

  return (
    <div>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Typography component="h1" variant="h5">

            </Typography>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {mode && "Sign In"}
            {!mode && "Sign Up"}
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            { !mode && <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password1"
              autoComplete="current-password"
            />}
            <div id="progress"></div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={mode? signIn : register}
            >
              {mode && "Sign In"}
              {!mode && "Sign Up"}
            </Button>
            
            <Grid item>
                <Link onClick={signUp} variant="body2">
                  {mode && "Don't have an account? Sign Up"}
                  {!mode && "Sign In instead!"}
                </Link>
              </Grid>
          </form>
        </div>
      </Grid>
      
    </Grid>

    {msg.disp && <SnackBar message={msg.message} severity={msg.severity} onHome={()=>{setMsg({disp: false})}} />}
    </div>
  );
}