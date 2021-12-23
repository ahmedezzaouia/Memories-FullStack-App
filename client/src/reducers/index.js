import posts from "./posts";
import authData from "./auth";
import { combineReducers } from "redux";

export default combineReducers({
  posts,
  authData,
});
