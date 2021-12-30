import posts from "./posts";
import authData from "./auth";
import { combineReducers } from "redux";
import paginate from "./paginate_loading";

export default combineReducers({
  posts,
  authData,
  paginate,
});
