import { React, useState, useEffect } from "react";
import { Container, Grow, Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import Form from "../form/form";
import Posts from "../posts/Posts";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import { AUTH, FETCH_ALL } from "../../constants/actionTypes.js";
import Paginate from "../Pagination";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  // const searchQuery = query.get("searchQuery");
  const navigateTo = useNavigate();
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.paginate.isLoading);

  const handleAddChip = (chip) => {
    setTags([...tags, chip]);
  };
  const handleDeleteChip = (chip) => {
    setTags(tags.filter((tag) => tag !== chip));
  };
  const onSearch = () => {
    if (tags.length > 0 || search.trim()) {
      dispatch(getPostsBySearch(search, tags));
      navigateTo(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",") || "none"}`);
    } else navigateTo("/");
  };

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  useEffect(() => {
    const authData = localStorage.getItem("user");
    if (authData != null) {
      dispatch({ type: AUTH, payload: JSON.parse(authData) });
    }
    console.log(JSON.parse(authData));
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            {isLoading ? <CircularProgress /> : <Posts setCurrentId={setCurrentId} />}
          </Grid>
          <Grid item xs={12} sm={4} elevate={3}>
            {/* add her onkeyPress */}
            <TextField
              name="search"
              variant="outlined"
              label="Search Memories"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ChipInput
              style={{ margin: "10px 0" }}
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Search Tags"
              variant="outlined"
              fullWidth
            />
            <Button onClick={onSearch} className={classes.searchButton} variant="contained" color="primary">
              Search
            </Button>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paginate page={page} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
