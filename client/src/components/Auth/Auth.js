import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, Grow } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from "./Icon";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";
import GoogleLogin from "react-google-login";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signInfo, setSignInfo] = useState(initialState);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const switchMode = () => {
    setIsSignup(!isSignup);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signInfo);
  };
  const googleSuccess = async (res) => {};
  const handleChange = (e) => {
    setSignInfo({ ...signInfo, [e.target.name]: e.target.value });
  };
  const googleError = () => {};

  return (
    <Grow in>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign Up" : "Sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignup ? "Sign Up" : "Sign in"}
            </Button>
            <GoogleLogin
              clientId="put your google id her"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grow>
  );
};

export default Auth;
