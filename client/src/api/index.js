import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});
export const fetchPosts = () => {
  return API.get("/posts");
};

export const addPost = (newPost) => {
  console.log("add post run");
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
