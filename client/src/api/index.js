import axios from "axios";

const URL = "https://ahmed-ezza.herokuapp.com/posts";
export const fetchPosts = () => {
  return axios.get(URL);
};

export const addPost = (newPost) => {
  return axios.post(URL, newPost);
};

export const updatePost = (id, post) => {
  return axios.patch(`${URL}/${id}`, post);
};

export const deletePost = (id) => {
  return axios.delete(`${URL}/${id}`);
};

export const likePost = (id) => {
  return axios.patch(`${URL}/${id}/likePost`);
};
