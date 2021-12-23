import { React, useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";
import { useSelector } from "react-redux";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authData);
  const post = useSelector((state) => {
    return currentId ? state.posts.find((post) => post._id === currentId) : null;
  });
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  const initialData = {
    creator: user?.result?.name,
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };
  const [postData, setPostData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("currentid = " + currentId);
    console.log("post = " + post);
    if (currentId) {
      //update post
      dispatch(updatePost(currentId, postData));

      console.log("update post");
    } else {
      // create post
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = () => {
    setPostData(initialData);
    setCurrentId(null);
  };
  return (
    <Paper className={classes.paper}>
      {!user?.result ? (
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      ) : (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{/* {currentId ? `Editing "${post.title}"` : "Creating a Memory"} */}</Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
            Clear
          </Button>
        </form>
      )}
    </Paper>
  );
};

export default Form;
