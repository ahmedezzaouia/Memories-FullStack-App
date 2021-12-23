import axios from "axios";
const authData = JSON.parse(localStorage.getItem("user"));
const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: { Authorization: `Bearer ${authData.token}` },
});
export const fetchPosts = () => {
  return API.get("/posts");
};

export const addPost = (newPost) => {
  return API.post("/posts", newPost);
};

export const updatePost = (id, post) => {
  return API.patch(`/posts/${id}`, post);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};
export const signUp = (authData) => {
  return API.post("/user/signup", authData);
};

export const signIn = (authData) => {
  return API.post("/user/signin", authData);
};
