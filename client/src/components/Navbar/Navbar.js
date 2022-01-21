import React, { useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { AUTH } from "../../constants/actionTypes";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector((state) => state.authData);
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: AUTH, payload: null });
    navigateTo("/auth");
  };

  useEffect(() => {
    console.log("useEffect of Navbar ");
    // check if the token expire
    // decode token will retun a payload decoded
    if (user) {
      const decodedToken = decode(user?.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  });

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result != null ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
