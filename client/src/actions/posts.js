import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  GET_POSTS_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  PAGINATE,
  FETCH_POST,
} from "../constants/actionTypes.js";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data.posts });
    dispatch({ type: PAGINATE, payload: { currentPage: data.currentPage, pagesCount: data.pagesCount } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getPost(id);
    console.log("fetched Post by Id", data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (search, tags) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getPostsBySearch(search, tags);
    dispatch({ type: GET_POSTS_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost, navigateTo) => async (dispatch) => {
  try {
    const { data } = await api.addPost(newPost);
    dispatch({ type: CREATE, payload: data });
    navigateTo(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE, payload: id });
    await api.deletePost(id);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
