import { React, useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Form from "../form/form";
import Posts from "../posts/Posts";
import { getPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes.js";

const Home = () => {
  console.log("AUTH Component run");

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const authData = localStorage.getItem("user");
    if (authData != null) {
      dispatch({ type: AUTH, payload: JSON.parse(authData) });
    }
    console.log(JSON.parse(authData));
  }, [dispatch]);

  useEffect(() => {
    console.log("home useeffect");
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
