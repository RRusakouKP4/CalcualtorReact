import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCookies } from "react-cookie";

function register(email,password){
  fetch('http://localhost:3001/user/signup',{
    method : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      "email": email,
      "password" : password
    })
  })
  .then(response => response.json())
  .then(data => console.log(data));
}

export default function Login() {
  const [cookies, setCookie] = useCookies(['authorization']);
  function login(email,password){
    fetch('http://localhost:3001/user/login',{
      method : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'withCredentials' : true,
      },
      credentials: 'include', 
      body: JSON.stringify({
        "email": email,
        "password" : password
      })
    })
    .then(response => response.json())
    .then(data => handleCookie(data.token)
    );
}
  function handleCookie(token) {
    setCookie("authorization", token, {
      path: "/"
    });
  }
  let handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const emailRef = React.useRef('')
  const passwordRef = React.useRef('')
  const sendValuesLogin = () => {
    login(emailRef.current.value, passwordRef.current.value)
  }
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"  sx={{color: "black"}}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx = {{color: 'black'}}
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , color: "black"}}
              onClick ={sendValuesLogin}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body3" sx={{color: 'black'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export function SignUp() {
  let handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const emailRef = React.useRef('')
  const passwordRef = React.useRef('')
  const sendValuesRegister = () => {
    register(emailRef.current.value, passwordRef.current.value)
  }
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "black"}}>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={sendValuesRegister}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
  );
}