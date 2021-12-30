import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts.js";

import useStyles from "../styles";
const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pagesCount = useSelector((state) => state?.paginate?.pagesCount);
  console.log("pages count == " + pagesCount);

  return (
    <Pagination
      classes={classes.url}
      count={pagesCount}
      page={Number(page)}
      variant="outlined"
      color="primary"
      size="large"
      renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />}
    />
  );
};

export default Paginate;
