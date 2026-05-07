import React, { useState } from "react";
import axios from "axios";
import { IconButton, Link, Alert, Button, Container, Paper, TextField, Typography, Box, CssBaseline } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {

    event.preventDefault();
    AuthService.login(email, password)
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem(
            "userData",
            JSON.stringify(response.data.data)
          );

          navigate('/home');
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (



    // <Box
    //   sx={{
    //     display: "flex",
    //     width:'100%',
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginTop: "5%",
    //   }}
    // >
    //   <Container maxWidth="sm">
    //     <form onSubmit={handleSubmit}>
    //       <h3>
    //         Sign in
    //       </h3>
    //       {error && (
    //         <Alert style={{ marginBottom: "20px" }} severity="error">
    //           {error}
    //         </Alert>
    //       )}
    //       <TextField
    //         type="email"
    //         value={email}
    //         onChange={handleEmailChange}
    //         variant="filled"
    //         id="email"
    //         label="Email address"
    //         fullWidth
    //         style={{ marginBottom: "20px" }}
    //       />
    //       <TextField
    //         type={showPassword ? "text" : "password"}
    //         value={password}
    //         onChange={handlePasswordChange}
    //         variant="filled"
    //         id="password"
    //         label="Password"
    //         fullWidth
    //         style={{ marginBottom: "20px" }}
    //         InputProps={{
    //           endAdornment: (
    //             <IconButton onClick={handleShowPassword}>
    //               {showPassword ? <VisibilityOff /> : <Visibility />}
    //             </IconButton>
    //           ),
    //         }}
    //       />
    //       <Button alignItems="right" variant="contained" type="submit">
    //         Login
    //       </Button>
    //       <p>
    //         Don't have an account? <Link href="/register">Sign up</Link>
    //       </p>
    //     </form>
    //   </Container>
    // </Box>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            {error && (
              <Alert style={{ marginBottom: "20px" }} severity="error">
                {error}
              </Alert>
            )}
            <TextField margin="normal" required fullWidth value={email} onChange={handleEmailChange} id="email" label="Email Address" name="email" autoFocus />
            <TextField margin="normal" required fullWidth value={password} onChange={handlePasswordChange} id="password"  label="Password" type="password" name="password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;


