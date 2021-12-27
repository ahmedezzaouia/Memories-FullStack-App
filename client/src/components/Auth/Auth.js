import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, Grow } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from "./Icon";
import { AUTH, SIGN_IN, SIGN_UP } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "../../actions/auth.js";
const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  console.log("AUTH Component run");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [userData, setSignInfo] = useState(initialState);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const switchMode = () => {
    setIsSignup(!isSignup);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // sign up the user
      dispatch(signUp(userData, navigateTo));
    } else {
      // sign in the user
      dispatch(signIn(userData, navigateTo));
      console.log("over dispatch line");
    }
  };
  const googleSuccess = async (res) => {
    console.log(res);
    const result = res.profileObj;
    const token = res.tokenId;
    dispatch({ type: AUTH, payload: { result, token } });
    navigateTo("/");
  };
  const handleChange = (e) => {
    setSignInfo({ ...userData, [e.target.name]: e.target.value });
  };
  const googleError = (err) => {
    console.log(err);
  };

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
              clientId="120246364014-91mku6vvi5rp3me5lqvlkht79qgrgq88.apps.googleusercontent.com"
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
